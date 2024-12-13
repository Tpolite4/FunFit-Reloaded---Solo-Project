import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

import { workout } from './WorkOutModel';

export const workOutController = {
  getWorkOut: (req, res, next) => {
    const { name } = req.params;
    if (name) {
      workout
        .findOne({ name: new RegExp(name, 'i') })

        .then((workout) => {
          if (!workout) {
            return next({
              log: `Workout not found: ${name}`,
              status: 400,
              message: { err: 'Workout not found in database' },
            });
          }
          res.locals.foundWorkout = workout;
          return next();
        })
        .catch((err) => {
          next({
            log: `Error fetching workout: ${err}`,
            status: 400,
            message: { err: 'Failed to fetch workout from database' },
          });
        });
    } else {
      // If no name is provided, return all workouts
      workout
        .find()
        .then((workouts) => {
          if (!workouts || workouts.length === 0) {
            return next({
              log: 'No workouts found',
              status: 404,
              message: { err: 'No workouts in the database' },
            });
          }
          res.locals.foundWorkout = workouts;
          return next();
        })
        .catch((err) => {
          next({
            log: `Error fetching workouts: ${err}`,
            status: 400,
            message: { err: 'Failed to fetch workouts from database' },
          });
        });
    }
  },

  addWorkOut: (req, res, next) => {
    const { name, muscleGroup, reps } = req.body;
    console.log(req.body);

    workout
      .create({ name, muscleGroup, reps })
      .then((workout) => {
        res.locals.newWorkOut = workout;
        return next();
      })
      .catch((err) =>
        next({
          log: `Error adding new Workout: ${err}`,
          status: 400,
          message: { err: `Workout not added` },
        })
      );
  },

  updateWorkOut: (req, res, next) => {
    const { name } = req.params;
    const updates = req.body;

    workout
      .findOneAndUpdate({ name: new RegExp(name, 'i') }, updates, {
        new: true,
      })

      .then((updatedWorkOut) => {
        if (!updatedWorkOut) {
          return next({
            status: 404,
            message: { err: 'Workout not found' },
          });
        }
        res.locals.updatedWorkOut = updatedWorkOut;
        return next();
      })
      .catch((err) =>
        next({
          log: `Error updating Workout Plan ${err}`,
          status: 500,
          message: { err: `Failed to update Workout Plan` },
        })
      );
  },

  deleteWorkOut: (req, res, next) => {
    const { name } = req.params;

    workout
      .findOneAndDelete({ name: new RegExp(name, 'i') })
      .then((deletedWorkOut) => {
        if (!deletedWorkOut) {
          return next({
            status: 404,
            message: { err: `Workout not found` },
          });
        }
        res.locals.deletedWorkOut = deletedWorkOut;
        console.log('Workout Deleted!');
        return next();
      })
      .catch((err) =>
        next({
          log: `Error deleting Workout: ${err}`,
          status: 500,
          message: { err: `Failed to delete Workout` },
        })
      );
  },

  loadInitialWorkOuts: async (req, res, next) => {
    const initialWorkOuts = [
      {
        name: 'Barbell Bench Press',
        muscleGroup: 'Chest',
        reps: '3x8',
      },
      { name: 'Goblet Squat', muscleGroup: 'Quads', reps: 40 },
      { name: 'Seated Dumbell Curl', muscleGroup: 'Biceps', reps: 48 },
      { name: 'Shoulder Press', muscleGroup: 'Shoulders', reps: 40 },
      { name: 'Push-ups', muscleGroup: 'Chest', reps: 100 },
    ];
    try {
      await workout.insertMany(initialWorkOuts, { ordered: false });
      console.log('Workouts loaded successfully');
      return next();
    } catch (err) {
      if (err.code === 11000) {
        console.log('Duplicate key error: Skipping duplicates');
        return next();
      }
      return next({
        log: `Error loading Workouts: ${err}`,
        status: 500,
        message: { err: 'Failed to load Workouts' },
      });
    }
  },
};
