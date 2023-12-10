const express = require('express');

const fs = require('fs');

const tourController = require('./../controllers/tourController');

const router = express.Router();

//we are creating an alias to a very popular route and in order to implement that route
// we will use a middleware
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getalltours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getalltours)
  .post(tourController.createTour);

// app.get('/api/v1/tours/:id', gettour);
// app.patch('/api/v1/tours/:id', updatetour);
// app.delete('/api/v1/tours/:id', deletetour);

//equivalent routes

router
  .route('/:id')
  .get(tourController.gettour)
  .patch(tourController.updatetour)
  .delete(tourController.deletetour);

module.exports = router;
