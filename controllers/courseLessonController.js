const multer = require("multer");
const sharp = require("sharp");
const CourseLesson = require("./../models/courseLessonModel");
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
exports.uploadCourseLessonImage = upload.single("image");

exports.resizeCourseLessonImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.image = `${req.body.name.split(" ")[0]}-${
    req.body.createdBy
  }-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/lessons/${req.body.image}`);

  next();
});

//get all CourseLesson
exports.getAllCourseLessons = factory.getAll(CourseLesson);
//create a CourseLesson
exports.createCourseLesson = factory.createOne(CourseLesson);

//get a CourseLesson
exports.getCourseLesson = factory.getOne(CourseLesson);

//deleting a CourseLesson
exports.deleteCourseLesson = factory.deleteOne(CourseLesson);

//updating a CourseLesson
exports.updateCourseLesson = factory.updateOne(CourseLesson);
