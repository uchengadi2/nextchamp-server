const multer = require("multer");
const sharp = require("sharp");
const Course = require("./../models/courseModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
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

//const upload = multer({ dest: "public/images/products" });

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//when uploading multiple files
exports.uploadProductImages = upload.fields([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

//uploading  and resizing the product cover image
exports.uploadCourseCoverImage = upload.single("imageCover");

exports.resizeCourseCoverImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.imageCover = `course-${req.body.createdBy}-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    // .resize(2000, 1333)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/courses/${req.body.imageCover}`);

  next();
});

//the handler to get all course
exports.getAllCourses = factory.getAll(Course);

//the handler to create a course
exports.createCourse = factory.createOne(Course);

//the handler to get one course
exports.getCourse = factory.getOne(Course);

//the handler to update a course
exports.updateCourse = factory.updateOne(Course);

//the handler to delete a course
exports.deleteCourse = factory.deleteOne(Course);
