const express = require('express');
const fs = require('fs');

const tourRouter = require('./routes/tourroutes');
const userRouter = require('./routes/userroutes');

const app = express();

app.use(express.json());

const router = express.Router();

//equivalent routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

// const tours = JSON.parse(
//   fs.readFileSync(
//     'C:/Users/Mrinal/Desktop/software engg/Natours/dev-data/data/tours-simple.json'
//   )
// );

// const getalltours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// const gettour = (req, res) => {
//   //:id => is for variables id is the variable here
//   console.log(req.params);
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);

//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invaild',
//     });
//   }
//   res.status(200).json({
//     status: 'success',

//     data: {
//       tours,
//     },
//   });
// };

// const updatetour = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       ststus: 'fail',
//       message: 'Invalid',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// };

// const createtour = (req, res) => {
//   const newid = tours.length;
//   const newtour = Object.assign({ id: newid }, req.body);
//   tours.push(newtour);
//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newtour,
//         },
//       });
//     }
//   );
// };

// const deletetour = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       ststus: 'fail',
//       message: 'Invalid',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: null,
//   });
// };

// const getallusers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not done yet',
//   });
// };

// const getuser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not done yet',
//   });
// };

// const createuser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not done yet',
//   });
// };

// const updateuser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not done yet',
//   });
// };

// const deleteuser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not done yet',
//   });
// };

// app.get('/api/v1/tours', getalltours);
// app.post('/api/v1/tours', createtour);

// const tourRouter = express.Router();

// tourRouter.route('/').get(getalltours).post(createtour);

// app.get('/api/v1/tours/:id', gettour);
// app.patch('/api/v1/tours/:id', updatetour);
// app.delete('/api/v1/tours/:id', deletetour);

//equivalent routes

// tourRouter.route('/:id').get(gettour).patch(updatetour).delete(deletetour);

// const userRouter = express.Router();

// userRouter.route('/').get(getallusers).post(createuser);

// userRouter.route('/:id').get(getuser).patch(updateuser).delete(deleteuser);
