// const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const app = require('./app');

const Tour = require('./models/tourModel');
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindandModify: false,
//   })
//   .then((con) => {
//     console.log('connected successfully');
//   });

// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'A tour must have a name'],
//     unique: true,
//   },
//   rating: { type: Number, default: 4.5 },
//   price: { type: Number, required: [true, 'A tour must have a price'] },
// });

// const Tour = mongoose.model('Tour', tourSchema);

// const testtour = new Tour({
//   name: 'The mountain biker',
//   rating: 4.5,
//   price: 4989,
// });

// testtour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR');
//   });

// console.log(process.env);

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(DB);
  console.log('listening on port', `${port}`);
});

// mongodb+srv://mrinalk1421:<password>@atlascluster.knymavz.mongodb.net/?retryWrites=true&w=majority
// QHUDZBBUrQSRxx6j
