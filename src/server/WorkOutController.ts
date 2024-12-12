import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

import { workout } from './WorkOutModel';

export const workOutController = {
  getWorkOut: (req, res, next) => {
    const { name } = req.params;
    console.log(req.params);

    workout
      .findOne({ name })
      .then((workout) => {
        if (!workout) {
          return next({
            log: `Workout not found! :${name}`,
            status: 400,
            message: { err: 'Workout not found in database' },
          });
        }
        res.locals.foundWorkout = workout;
        return next();
      })
      .catch((err) => {
        next({
          log: `Error fetching Workout: ${err}`,
          status: 400,
          message: { err: 'Failed to fetch Workout from database' },
        });
      });
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
      .findOneAndUpdate({ name }, updates, { new: true })
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
      .findOneAndDelete({ name })
      .then((deletedWorkOut) => {
        if (!deletedWorkOut) {
          return next({
            status: 404,
            message: { err: `Workout not found` },
          });
        }
        res.locals.deletedWorkOut = deletedWorkOut;
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
      { name: 'Goblet Squat', muscleGroup: 'Quads', reps: '4x10' },
      { name: 'Seated Dumbell Curl', muscleGroup: 'Biceps', reps: '4x12' },
      { name: 'Shoulder Press', muscleGroup: 'Shoulders', reps: '4x10' },
      { name: 'Push-ups', muscleGroup: 'Chest', reps: '5x20' },
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
