// src/redis.ts
import IORedis from 'ioredis';

export const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379),
});

// Optional: log connection
redisConnection.on('connect', () => console.log('Connected to Redis (BullMQ)'));
redisConnection.on('error', (err) => console.error('Redis error:', err));

export default redisConnection;