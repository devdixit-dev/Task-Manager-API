import express from "express";
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

app.use('/api/auth', limiter, Auth); // 15 min - 100 req
app.use('/api/admin', isAuthenticated, isAdmin, Admin);
app.use('/api/task', isAuthenticated, Task);

app.get('/', (_, res) => {
  res.send('Home page');
});

app.listen(port, () => {
  console.log(`SERVER: http://localhost:${port}`);
});