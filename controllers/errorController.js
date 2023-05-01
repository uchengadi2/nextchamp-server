const AppError = require("./../utils/appError");

const handleCastErroDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  //console.log(err.keyValue.name);
  //const value = err.errMsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const value = err.keyValue.name;
  const message = `Duplicate field value : ${value}, Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJwtError = (err) =>
  new AppError("Invalid token. Please login again", 401);

const handleJwtExpiredError = (err) =>
  new AppError("This token is expired, please login again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational errors that we trust
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming or other unknow errors . Just dont want to leak the detail to the client
  } else {
    // 1. Log the error
    //console.error(err);

    // 2. send the generic message
    res.status(500).json({
      status: "error",
      message: "Something went seriously wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    console.log(error.name);
    if (error.name === "CastError") {
      error = handleCastErroDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJwtError(error);
    }
    if (error.name === "TokenExpiredError") {
      error = handleJwtExpiredError(error);
    }
    sendErrorProd(error, res);
  }
};
