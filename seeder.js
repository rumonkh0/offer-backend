const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Product = require('./models/Product');
const Controller = require('./models/ControllerCourseSchema.post("findOneAndUpdate", async function (doc) {
  ');
// const User = require('./models/User');
// const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/__data/products.json`, 'utf-8')
);

const controllers = JSON.parse(
  fs.readFileSync(`${__dirname}/__data/controller.json`, 'utf-8')
);

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
// );

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
// );

// Import into DB
const importData = async () => {
  try {
    await Product.create(products);
    await Controller.create(controllers);
    // await User.create(users);
    // await Review.create(reviews);
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await Controller.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
