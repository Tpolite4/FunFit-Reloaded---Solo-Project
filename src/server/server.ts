import dotenv from 'dotenv';
dotenv.config({path : './.env'});

import express, { Request, Response } from 'express';
import path from 'path';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const Port = 3000;

// const workOutRouter = require('./routes/workOutRoutes');
//workOutRouter.use()

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
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
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

app.get('/', (req: Request, res: Response) => {
  res.send('Working!!');
});

app.listen(Port, () => {
  console.log(`Using Express with TypeScript ${Port}`);
});
console.log(`Server running with PID: ${process.pid}`);
 
// app.listen(Port, () => console.log(`Server running on port ${Port}`));
