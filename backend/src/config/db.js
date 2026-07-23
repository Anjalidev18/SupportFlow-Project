import mongoose from 'mongoose';
import env from './env.js';

export async function connectDB() {
  await mongoose.connect(env.mongodbUri);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

export function getDatabaseStatus() {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[state] || 'unknown';
}
