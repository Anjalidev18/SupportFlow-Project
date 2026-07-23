import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required in production');
}

const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/supportflow',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  apiVersion: process.env.API_VERSION || '0.1.0',
  jwtSecret:
    process.env.JWT_SECRET || 'dev-secret-change-in-production-min-32-chars!!',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || (isProduction ? 12 : 10),
  isProduction,
};

export default env;
