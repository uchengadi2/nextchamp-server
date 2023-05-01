const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./..//utils/appError");
const sendEmail = require("./..//utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  user.password = undefined; //remove the password field from showing up
  //sending the token in a cookie
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
    passwordResetToken: req.body.passwordResetToken,
    vendor: req.body.vendor,
    phoneNumber: req.body.phoneNumber,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //console.log(req.body);

  // 1. check if email and password actually exist
  if (!email || !password) {
    return next(
      new AppError("Provide both the email and password for login", 400)
    );
  }

  // 2. check if user exist and the password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3. if everything is ok, send the jwt token to the client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1, Get the token and check if it exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, Please login to get access", 401)
    );
  }

  //console.log("this is promisify:", req.headers.authorization);

  // 2. verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user  still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The User that belongs to this token no longer exist", 401)
    );
  }

  // 4. check if the user changed password the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "You recently changed your password, please login again to get a new token",
        401
      )
    );
  }

  //grant access to the protected route
  req.user = currentUser;
  next();
});

//only for rendered pages. there will be no error
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    //1. verify token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    // 2. Check if user  still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    // 3. check if the user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    //4. There is a logged in user
    res.locals.user = currentUser;
    return next();
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //role is an array
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorised to perform this activity", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1 Get User based on posted emails
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("This user does not exist", 404));
  }
  //2. Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //3. Send it to user's email
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetpassword/${resetToken};`;
  const message = `Forgot your password? Please click on this link to reset your password ${resetUrl}, \n If you didn't forget your password, please ignore  this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password Reset Token (valid for 10 mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent via email to the user",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email for password reset, Try again later"
      ),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //2. if token has nnot expired and there is a user, set the new password
  if (!user) {
    return next(
      new AppError(
        "This token had expired. Please make a fresh reqest for password reset",
        400
      )
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3. Update the changePasswordAt property for the current user

  // 4. Log the user in by sending him the jwt token
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1. Get the user from the collection
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(
      new AppError("This user is not logged in or does not exist"),
      400
    );
  }

  //2. Check if the POSTed current password is correct
  if (await !user.correctPassword(req.body.passwordCurrent, user.password)) {
    return next(new AppError("Your current password is not correct", 401));
  }

  // 3. then upate the password if the password is correct
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //log the user in, send the JWT token back to the user
  createSendToken(user, 200, res);
});
