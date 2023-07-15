import asyncHandler from 'express-async-handler';

import Category from '../models/categoryModel';

/**
 * @desc    fetch all categories
 * @route   GET /api/categories
 * @acess   public
 */
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});
