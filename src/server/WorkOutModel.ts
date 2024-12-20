import mongoose, { Schema, model, connect } from 'mongoose';

const workOutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  reps: { type: Number, required: true },
});

export const workout = mongoose.model('workout', workOutSchema);
