const multer = require("multer");
const sharp = require("sharp");
const Vendor = require("./../models/vendorModel");
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
exports.uploadVendorLogo = upload.single("logo");

exports.resizeVendorLogo = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.logo = `vendor-${req.params.id}-${Date.now()}-logo.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/vendors/${req.body.logo}`);

  next();
});

//the handler to get all vendors
exports.getAllVendors = factory.getAll(Vendor);

//the handler to create a vendor
exports.createVendor = factory.createOne(Vendor);

//the handler to get one vendor
exports.getVendor = factory.getOne(Vendor);

//the handler to update a vendor
exports.updateVendor = factory.updateOne(Vendor);

//the handler to delete a vendor
exports.deleteVendor = factory.deleteOne(Vendor);
