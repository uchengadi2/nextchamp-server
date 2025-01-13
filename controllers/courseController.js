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

//const upload = multer({ dest: "public/images/users" });

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//when uploading a single file
//exports.uploadEventThumbnailImage = upload.single("thumbnail");

//for multiple images in a field that is an array, use the following
//exports.uploadImages = upload.array('images',3)

//for more than one file(multiple files)
exports.uploadCourseImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 12 },
]);

exports.resizeCourseImages = catchAsync(async (req, res, next) => {
  //if (!req.files.thumbnail || !req.files.images) return next();
  //if (!req.files.thumbnail) return next();

  //processing the thumbnail

  if (req.files.imageCover) {
    req.body.imageCover = `courses-${
      req.body.createdBy
    }-${Date.now()}-imageCover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/courses/${req.body.imageCover}`);
  }

  if (req.files.images) {
    //processing other images
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, index) => {
        const filename = `courses-${req.body.createdBy}-${Date.now()}-${
          index + 1
        }.jpeg`;

        await sharp(file.buffer)
          // .resize(2000, 1333)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/courses/${filename}`);
        req.body.images.push(filename);
      })
    );
  }

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
