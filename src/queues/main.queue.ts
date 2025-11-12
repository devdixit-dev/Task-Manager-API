import redisConnection from "../configs/ioredis.config";
import { JobScheduler, Queue, Worker } from "bullmq";

const emailQueue = new Queue(
  'emailQueue',
  { connection: redisConnection }
);

const emailScheduler = new JobScheduler(
  'emailQueue',
  { connection: redisConnection }
);

const emailWorker = new Worker(
  'emailQueue',
  async (job: any) => {
    console.log(`Processing job ${job.id} type=${job.name} payload=${job.data}`);

    if(!job.data.to.includes('@')) {
      throw new Error('Invalid recipient');
    }
  },
  { connection: redisConnection, concurrency: 5 }
);

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on('failed', async (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}`);

  if(job) {
    return "OK"
  }
});

export async function closeQueues() {
  await emailWorker.close();
  await emailQueue.close();
  await emailScheduler.close();
}