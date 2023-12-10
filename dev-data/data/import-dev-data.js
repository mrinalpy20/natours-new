const mongoose = require('mongoose');
const fs = require('fs');
// const app = require('./app');

const Tour = require('./../../models/tourModel');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connection successful!'));

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useFindandModify: false,
//   })
//   .then(() => {
//     console.log('connected successfully');
//   })
//   .catch((err) => {
//     console.log(err); // Handling errors
//   });

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
  connection.close(() => {
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  });
});

// const connectDB = async () => {
//   try {
//     await mongoose.connect(DB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // useFindAndModify: false,
//     });
//     console.log('Connected successfully');
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//   }
// };

// connectDB();
//read file
const tours = JSON.parse(
  fs.readFileSync(
    'C:/Users/Mrinal/Desktop/software engg/Natours/dev-data/data/tours-simple.json',
    'utf-8'
  )
);

//import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('created');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all data from db

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
