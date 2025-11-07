import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URI || 'redis://localhost:6379'
});

redisClient.on('connect', () => { console.log(`REDIS: ${process.env.REDIS_URI}`) });
redisClient.on('error', (e) => { console.log(`Redis connection error - ${e}`) })

export const connectRedis = async () => {
  await redisClient.connect();
}

export default redisClient;