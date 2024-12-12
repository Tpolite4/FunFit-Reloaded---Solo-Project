import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express, { Request, Response } from 'express';
import path from 'path';
// import { workOutRouter } from '../routers';
import mongoose, { ConnectOptions } from 'mongoose';
import { workOutController } from './WorkOutController';

const app = express();
const Port = 3000;
const mongoURI =
  process.env.MONGO_URI ||
  'mongodb+srv://username:password@cluster.mongodb.net/defaultDB?retryWrites=true&w=majority';

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   serverApi: { version: '1', strict: true, deprecationErrors: true },
    } as ConnectOptions);
    console.log('Connected to MongoDB');
    workOutController.loadInitialWorkOuts({}, {}, (err) => {
      if (err) console.error(err);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

// const mongoURI =
//   'mongodb+srv://tpolite4:VYG5OVPMZQHLHijO@cluster0.ekuew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// mongoose
//   .connect
//   .then(() => {
//     console.log('Connected to MongoDB');
//     //Load initial workouts after database connection
//     //WorkOutController.loadWorkOut({},{}, (err => {
//     //if (err) console.error(err);})
//   })
//   .catch((err) => console.error('MongoDB connection error'));

// Unknown route handler

app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(Port, () => {
  console.log(`Using Express with TypeScript ${Port}`);
});
console.log(`Server running with PID: ${process.pid}`);

// app.listen(Port, () => console.log(`Server running on port ${Port}`));
