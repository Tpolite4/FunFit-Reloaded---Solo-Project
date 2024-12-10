import express, { Request, Response } from 'express';
const app = express();

import mongoose, { ConnectOptions } from 'mongoose';

const Port = 3000;

const uri =
  'mongodb+srv://tpolite4:VYG5OVPMZQHLHijO@cluster0.ekuew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// const clientOptions: ConnectOptions = {
//   serverApi: { version: '1', strict: true, deprecationErrors: true },
// };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    } as ConnectOptions);
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



app.get('/', (req: Request, res: Response) => {
  res.send('Working!!');
});

app.listen(Port, () => {
  console.log(`Using Express with TypeScript ${Port}`);
});

// app.listen(Port, () => console.log(`Server running on port ${Port}`));
