const multer = require("multer");
const sharp = require("sharp");
const Country = require("../models/countryModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
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
exports.uploadCountryFlag = upload.single("flag");

exports.resizeCountryFlag = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  //1. start by processing the cover image
  req.body.flag = `${req.body.name}-${
    req.body.createdBy
  }-${Date.now()}-flag.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/countries/${req.body.flag}`);

  next();
});

//the handler to get all countries
exports.getAllCountries = factory.getAll(Country);

//the handler to create a country
exports.createCountry = factory.createOne(Country);

//the handler to get one country
exports.getCountry = factory.getOne(Country);

//the handler to update a country
exports.updateCountry = factory.updateOne(Country);

//the handler to delete a country
exports.deleteCountry = factory.deleteOne(Country);
