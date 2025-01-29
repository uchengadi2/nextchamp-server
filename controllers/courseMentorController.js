const multer = require("multer");
const sharp = require("sharp");
const CourseMentor = require("./../models/courseMentorModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

const multerStorage = multer.memoryStorage();

//create a multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("this file is not an image, Please upload only images", 404),
      false
    );
  }
};

//const upload = multer({ dest: "public/images/users" });

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//when uploading a single file
exports.uploadCourseMentorImage = upload.single("image");

exports.resizeCourseMentorImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.image = `${req.body.name.split(" ")[0]}-${
    req.body.createdBy
  }-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/mentors/${req.body.image}`);

  next();
});

//get all CourseMentor
exports.getAllCourseMentors = factory.getAll(CourseMentor);
//create a CourseMentor
exports.createCourseMentor = factory.createOne(CourseMentor);

//get a CourseMentor
exports.getCourseMentor = factory.getOne(CourseMentor);

//deleting a CourseMentor
exports.deleteCourseMentor = factory.deleteOne(CourseMentor);

//updating a CourseMentor
exports.updateCourseMentor = factory.updateOne(CourseMentor);
