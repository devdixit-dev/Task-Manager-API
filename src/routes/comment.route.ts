import express from 'express';

import { AddComment } from '../controllers/comment.controller.js';

const CommentRoute = express.Router();

CommentRoute.put('/:id', AddComment);

export default CommentRoute;