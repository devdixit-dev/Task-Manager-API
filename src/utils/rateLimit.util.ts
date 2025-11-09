import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: 'Too many requests. please try after sometime',
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

export default limiter;