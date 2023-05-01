const multer = require("multer");
const sharp = require("sharp");
const Product = require("./../models/productModel");
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
exports.uploadProductCoverImage = upload.single("imageCover");

exports.resizeProductCoverImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  req.body.imageCover = `product-${
    req.body.createdBy
  }-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    // .resize(2000, 1333)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.body.imageCover}`);

  next();
});

//uploading  and resizing the product first image
exports.uploadProductFirstImage = upload.single("firstImage");

exports.resizeProductFirstImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the first image
  req.body.firstImage = `product-${
    req.body.createdBy
  }-${Date.now()}-first.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.body.firstImage}`);

  next();
});

//uploading  and resizing the product second image
exports.uploadProductSecondImage = upload.single("secondImage");

exports.resizeProductSecondImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the second image
  req.body.secondImage = `product-${
    req.body.createdBy
  }-${Date.now()}-second.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.body.secondImage}`);

  next();
});

//uploading  and resizing the product third image
exports.uploadProductThirdImage = upload.single("thirdImage");

exports.resizeProductThirdImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the third image
  req.body.thirdImage = `product-${
    req.body.createdBy
  }-${Date.now()}-third.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.body.thirdImage}`);

  next();
});

//uploading  and resizing the product fourth image
exports.uploadProductFourthImage = upload.single("fourthImage");

exports.resizeProductFourthImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the fourth image
  req.body.fourthImage = `product-${
    req.body.createdBy
  }-${Date.now()}-fourth.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.body.fourthImage}`);

  next();
});

// exports.resizeProductImages = catchAsync(async (req, res, next) => {
//   //   console.log(req.files); //logging multiples
//   if (!req.files.imageCover || !req.files.images) return next();

//   //1. start by processing the cover image
//   req.body.imageCover = `product-${
//     req.body.createdBy
//   }-${Date.now()}-cover.jpeg`;

//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/images/products/${req.body.imageCover}`);

//   //2. process all the other images in a loop
//   req.body.images = [];
//   await Promise.all(
//     req.files.images.map(async (file, index) => {
//       const filename = `product-${req.body.createdBy}-${Date.now()}-${
//         index + 1
//       }.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/images/products/${filename}`);

//       req.body.images.push(filename);
//     })
//   );

//   next();
// });

//assuming there were only one image field on the form but accepts multiple images, it can be treated with this script

//exports.uploadMultupleImages = upload.array("images", 5); //will product req.files

//the handler to get all product
exports.getAllProducts = factory.getAll(Product);

//the handler to create a product
exports.createProduct = factory.createOne(Product);

//the handler to get one product
exports.getProduct = factory.getOne(Product);

//the handler to update a product
exports.updateProduct = factory.updateOne(Product);

//the handler to delete a product
exports.deleteProduct = factory.deleteOne(Product);
