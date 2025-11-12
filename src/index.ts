import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";

import connectDB from "./configs/database.config.js";
import { connectRedis } from "./configs/redis.config.js";

import { isAdmin, isAuthenticated } from "./middlewares/auth.middleware.js";

import AuthRoute from "./routes/auth.route.js";
import AdminRoute from "./routes/admin.route.js";
import TaskRoute from "./routes/task.route.js";
import UserRoute from "./routes/user.route.js";

import limiter from "./utils/rateLimit.util.js";
import CommentRoute from "./routes/comment.route.js";

const app = express();
const port = process.env.PORT || 8000;

connectDB();
connectRedis();

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use('/api/auth', limiter, AuthRoute); // 15 min - 100 req
app.use('/api/admin', isAuthenticated, isAdmin, AdminRoute);
app.use('/api/user', isAuthenticated, UserRoute);
app.use('/api/task', isAuthenticated, TaskRoute);
app.use('/api/comment', isAuthenticated, CommentRoute);

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message,
  });
});

app.get('/', (_, res) => {
  res.send('Home page');
});

app.listen(port, () => {
  console.log(`SERVER: http://localhost:${port}`);
});

export default app;