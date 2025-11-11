import express, { NextFunction } from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import helmet from "helmet";

import connectDB from "./configs/database.config";
import Auth from "./routes/auth.route";
import { connectRedis } from "./configs/redis.config";
import limiter from "./utils/rateLimit.util";
import Admin from "./routes/admin.route";
import { isAdmin, isAuthenticated } from "./middlewares/auth.middleware";
import Task from "./routes/task.route";

const app = express();
const port = process.env.PORT || 8000;

connectDB();
connectRedis();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use((req, _, next) => {
  console.log(`${req.method} - ${req.url} - ${req.ip}`);
  next();
});

app.get('/uptime', (_, res) => {
  return res.json({
    success: true,
    uptime: process.uptime()
  });
});

app.use('/api/auth', limiter, Auth); // 15 min - 100 req
app.use('/api/admin', isAuthenticated, isAdmin, Admin);
app.use('/api/task', isAuthenticated, Task);

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message,
  });
});

app.get('/api/user/me', isAuthenticated, (req, res) => {
  try {
    const user = (req as any).user;

    return res.status(200).json({
      success: true,
      message: 'Profile fetched',
      profile: user
    });
  }
  catch(err) {
    console.log(`Error fetching user profile - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/', (_, res) => {
  res.send('Home page');
});

app.listen(port, () => {
  console.log(`SERVER: http://localhost:${port}`);
});