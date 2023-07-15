import asyncHandler from 'express-async-handler';

import Product from '../models/productModel';

/**
 * @desc    fetch all products
 * @route   GET /api/products
 * @acess   public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, sortBy, minPrice, maxPrice } = req.query;

  let options: { sort?: any } = {};

  switch (sortBy) {
    case 'popularity':
      options.sort = {
        rating: -1,
      };
      break;

    case 'ASC':
      options.sort = {
        price: 1,
      };
      break;

    case 'DESC':
      options.sort = {
        price: -1,
      };
      break;

    default:
      options.sort = {
        createdAt: -1,
      };
      break;
  }

  let products;

  let priceOptions: any = { $gte: minPrice };
  if (maxPrice) {
    priceOptions.$lte = maxPrice;
  }

  if (category === 'all') {
    products = await Product.find({ price: priceOptions }, {}, options);
  } else {
    products = await Product.find(
      { categories: category, price: priceOptions },
      {},
      options
    );
  }

  res.json(products);
});

/**
 * @desc    fetch a single product by id
 * @route   GET /api/products/:id
 * @acess   public
 */
export const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).populate('categories');

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error('محصول یافت نشد');
    }
  } catch (error) {
    res.status(404);
    throw new Error('خطایی رخ داده است.');
  }
});

/**
 * @desc    Create a new review
 * @route   POST /api/products/:id/reviews
 * @acess   Private
 */
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('محصول یافت نشد');
  }

  // check if user already reviews
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('شما قبلا به این محصول نظر داده اید.');
  }

  // add review
  const review = {
    name: req.user.username,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'نظر شما اضافه شد' });
});

/**
 * @desc    Get related products
 * @route   GET /api/products/:id/related
 * @acess   Public
 */
export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('محصول یافت نشد');
  }

  let filter = [];
  for (const category of product.categories) {
    filter.push({ categories: category });
  }

  // Get related products based on categories
  const relatedProducts = await Product.find({
    $and: [{ $or: filter }, { _id: { $ne: product._id } }],
  }).limit(4);

  res.json(relatedProducts);
});

/**
 * @desc    Get Searched Products
 * @route   GET /api/products/search/:keyword
 * @acess   Public
 */
export const getSearchedProducts = asyncHandler(async (req, res) => {
  const keyword = {
    title: {
      $regex: req.params.keyword,
      $options: 'i',
    },
  };

  const products = await Product.find({ ...keyword });

  res.json(products);
});
