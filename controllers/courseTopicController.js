const multer = require("multer");
const sharp = require("sharp");
const CourseTopic = require("./../models/courseTopicModel");
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
exports.uploadCourseTopicImage = upload.single("image");

exports.resizeCourseTopicImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.image = `${req.body.name.split(" ")[0]}-${
    req.body.createdBy
  }-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/topics/${req.body.image}`);

  next();
});

//get all CourseTopic
exports.getAllCourseTopics = factory.getAll(CourseTopic);
//create a CourseTopic
exports.createCourseTopic = factory.createOne(CourseTopic);

//get a CourseTopic
exports.getCourseTopic = factory.getOne(CourseTopic);

//deleting a CourseTopic
exports.deleteCourseTopic = factory.deleteOne(CourseTopic);

//updating a CourseTopic
exports.updateCourseTopic = factory.updateOne(CourseTopic);
