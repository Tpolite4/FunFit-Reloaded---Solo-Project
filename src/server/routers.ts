import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { Router } from 'express';
import { workOutController } from './WorkOutController';

const workOutRouter = express.Router();

workOutRouter.get('/', workOutController.getWorkOut, (req, res) => {
  res.status(200).json(res.locals.foundWorkout);
});

workOutRouter.get('/:name', workOutController.getWorkOut, (req, res) => {
  res.status(200).json(res.locals.foundWorkout);
});

workOutRouter.post('/', workOutController.addWorkOut, (req, res) => {
  res.status(200).json(res.locals.newWorkOut);
});

workOutRouter.patch('/:name', workOutController.updateWorkOut, (req, res) => {
  res.status(200).json(res.locals.updatedWorkOut);
});
workOutRouter.delete('/:name', workOutController.deleteWorkOut, (req, res) => {
  res.status(200).json(res.locals.deletedWorkOut);
});

// workOutRouter.load('/', workOutController.loadInitialWorkOut, (req, res) => {
//     res.status(200).json({});
//   });

export default workOutRouter;
