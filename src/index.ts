import express from "express";
import 'dotenv/config';

import connectDB from "./configs/database.config";
import Auth from "./routes/auth.route";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(helmet());

app.use('/auth', Auth);

app.use((req, _, next) => {
  console.log(`${req.method} - ${req.url} - ${req.ip}`);
  next();
});

app.get('/', (_, res) => {
  res.send('Home page');
});

app.listen(port, () => {
  console.log(`SERVER: http://localhost:${port}`);
});