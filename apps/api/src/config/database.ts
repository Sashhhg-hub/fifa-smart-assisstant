import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase(): Promise<void> {
  const uri = env.MONGODB_URI;

  if (!uri) {
    console.warn('MongoDB connection URI is not defined. Database connection skipped.');
    return;
  }

  try {
    mongoose.connection.on('connected', () => {
      console.log('Successfully connected to MongoDB.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected.');
    });

    await mongoose.connect(uri);
  } catch (error) {
    console.error('Failed to establish initial MongoDB connection:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('MongoDB database pool disconnected cleanly.');
  } catch (error) {
    console.error('Error during MongoDB disconnection:', error);
  }
}

// Graceful shutdown handlers
function handleGracefulShutdown(signal: string) {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Initiating graceful shutdown...`);
    await disconnectDatabase();
    process.exit(0);
  });
}

handleGracefulShutdown('SIGINT');
handleGracefulShutdown('SIGTERM');
