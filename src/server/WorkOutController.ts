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

  addWorkOut: () => {},

  updateWorkOut: () => {},

  deleteWorkOut: () => {},
};
