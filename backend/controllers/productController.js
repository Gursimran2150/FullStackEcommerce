const mongoose = require("mongoose");

const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require('cloudinary')

// Create Product - Admin
exports.createProduct = async (req, res, next) => {
  try {

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    // req.body.user = req.user.id;



    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Cannot Create Product" });
  }
};

// Update Product - Admin
exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Cannot Update Product" });
  }
};

// Delete Product - Admin
exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Cannot Delete Product" });
  }
};

// Get all Products
exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 8;

    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get product details
exports.getProductDetails = async (req, res, next) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found" });
  }
};

//Create a new Review Or Update
exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
      // await product.save();
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      sucess: true,
    });
  } catch (e) {
    res.status(401).json({
      sucess: false,
      err: e,
    });
  }
};

//get all reviews
exports.getAllReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!Product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

//delete review

exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const newReviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    const newNumOfReviews = newReviews.length;

    let newRating = 0;
    if (newNumOfReviews > 0) {
      const sumOfRatings = newReviews.reduce((acc, rev) => {
        if (rev.rating) {
          return acc + rev.rating;
        }
        return acc;
      }, 0);
      newRating = sumOfRatings / newNumOfReviews;
    }

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews: newReviews,
        numOfReviews: newNumOfReviews,
        rating: Number(newRating.toFixed(2)),
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the review.",
    });
  }
};
