import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./configs/database.config";
import Auth from "./routes/auth.route";
import helmet from "helmet";
import { connectRedis } from "./configs/redis.config";

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

app.use('/auth', Auth);

app.get('/', (_, res) => {
  res.send('Home page');
});

app.listen(port, () => {
  console.log(`SERVER: http://localhost:${port}`);
});