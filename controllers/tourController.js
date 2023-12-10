const express = require('express');
const Tour = require('C:/Users/Mrinal/Desktop/software engg/Natours/models/tourModel.js');
const fs = require('fs');
const { match } = require('assert');

const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
//otherwise this middle ware will be struck here forever

exports.getalltours = async (req, res) => {
  try {
    // ... helps us to destructure the query i.e. only the query part and the {} converts it into an object
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // //advanced filtering using regex
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b{gte|gt|lte|lt}\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // console.log(req.query, queryObj);
    // let query = Tour.find(JSON.parse(queryStr));
    // Sorting
    // if (req.query.sort) {
    //   const sortby = req.query.sort.split(',').join(' ');
    //   console.log(sortby);
    //   query = query.sort(sortby);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    //Field Limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v'); //- minus excluding the __v field
    // }

    //Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // // page=2&limit=10 , 1-10 page 1, 11-20 page 2, 21-30 page 3
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   //if we skip the number which is greater than the number of doc
    //   //then the page does not exist
    //   if (numTours <= skip) {
    //     throw new Error('This page does not exist');
    //   }
    // }
    //execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitfields()
      .paginate();
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      // results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.gettour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      // results: tours.length,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'working error',
    });
  }

  //:id => is for variables id is the variable here
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'invaild',
  //   });
  // }
  // res.status(200).json({
  //   status: 'success',

  //   data: {
  //     tours,
  //   },
};

exports.updatetour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      // results: tours.length,
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'working error',
    });
  }
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     ststus: 'fail',
  //     message: 'Invalid',
  //   });
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

// Update the path

exports.createTour = async (req, res) => {
  try {
    // Extract the data directly from req.body, no need for the 'c' key
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message, // Display the actual error message for debugging
    });
  }
};

exports.deletetour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     ststus: 'fail',
  //     message: 'Invalid',
  //   });
  // }

  res.status(200).json({
    status: 'success',
    data: null,
  });
};
// In Node.js, the aggregate function in MongoDB is used to perform advanced data processing
// and transformations on collections by applying a sequence (array) of operations, such as
// filtering, grouping, and projecting, through a pipeline.
// It enables complex data manipulations and aggregations in a concise and flexible manner.
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { duration: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: {
              $dateFromString: {
                dateString: `${year}-01-01`,
              },
            },
            $lte: {
              $dateFromString: {
                dateString: `${year}-12-31`,
              },
            },
          },
        },
      },

      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
