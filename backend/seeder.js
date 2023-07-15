import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users';
import products from './data/products';
import categories from './data/categories';

import User from './models/userModel';
import Product from './models/productModel';
import Category from './models/categoryModel';
import connectDB from './config/db';

dotenv.config();
connectDB();

interface ErrorMessage {
  message: string;
}

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdCategories = await Category.insertMany(categories);

    const adminUser = createdUsers[0]._id;
    const productCategories = [createdCategories[0], createdCategories[1]];

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser, categories: productCategories };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.log(`${(error as ErrorMessage).message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.log(`${(error as ErrorMessage).message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
