// backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Optional: If you want colors in terminal, run 'npm install colors'
// const colors = require('colors'); 
const products = require('./data/products');
// Import your Models
const Product = require('./models/productModel');
const User = require('./models/userModel'); 
// Import your DB connection logic
const connectDB = require('./config/db'); // Ensure this path matches your file structure

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear all existing data to avoid duplicates
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Old Data Destroyed...');

    // 2. Insert Products
    await Product.insertMany(products);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
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
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Check command line arguments to decide whether to Import or Destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}