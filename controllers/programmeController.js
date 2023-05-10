const multer = require("multer");
const sharp = require("sharp");
const Programme = require("./../models/programmeModel");
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
exports.uploadProgrammeImage = upload.single("image");

exports.resizeProgrammeImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.image = `${req.body.name.split(" ")[0]}-${
    req.body.createdBy
  }-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/programmes/${req.body.image}`);

  next();
});

//get all Programmes
exports.getAllProgrammes = factory.getAll(Programme);
//create a Programme
exports.createProgramme = factory.createOne(Programme);

//get a Programme
exports.getProgramme = factory.getOne(Programme);

//deleting a Programme
exports.deleteProgramme = factory.deleteOne(Programme);

//updating a Programme
exports.updateProgramme = factory.updateOne(Programme);
