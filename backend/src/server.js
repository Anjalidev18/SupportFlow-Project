import app from './app.js';
import env from './config/env.js';
import { connectDB } from './config/db.js';

async function start() {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`SupportFlow API running on http://localhost:${env.port}`);
      console.log(`Health check: http://localhost:${env.port}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
