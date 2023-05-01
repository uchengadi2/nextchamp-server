const multer = require("multer");
const sharp = require("sharp");
const Currency = require("./../models/currencyModel");
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
exports.uploadCurrencySymbol = upload.single("symbol");

exports.resizeCurrencySymbol = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.symbol = `${req.body.name.split(" ")}-${
    req.body.createdBy
  }-${Date.now()}-symbol.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/currencies/${req.body.symbol}`);

  next();
});

//the handler to get all currencies
exports.getAllCurrencies = factory.getAll(Currency);

//the handler to create a currency
exports.createCurrency = factory.createOne(Currency);

//the handler to get one currency
exports.getCurrency = factory.getOne(Currency);

//the handler to update a currency
exports.updateCurrency = factory.updateOne(Currency);

//the handler to delete a currency
exports.deleteCurrency = factory.deleteOne(Currency);
