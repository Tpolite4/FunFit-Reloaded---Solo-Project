import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Router } from 'express';
import { workOutController } from './WorkOutController';

export const workOutRouter = Router();

workOutRouter.post('/', workOutController.addWorkOut, (req, res) => {
  res.status(200).json({});
});
workOutRouter.get('/', workOutController.getWorkOut, (req, res) => {
  res.status(200).json({});
});
workOutRouter.patch('/', workOutController.updateWorkOut, (req, res) => {
  res.status(200).json({});
});
workOutRouter.delete('/', workOutController.deleteWorkOut, (req, res) => {
  res.status(200).json({});
});
