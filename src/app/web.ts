import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware';
import { publicRouter } from '../routes/public-router';
import { apiRouter } from '../routes/api';
export const web = express()
web.use(express.json()) 
web.use(publicRouter)
web.use(apiRouter)

web.use(errorMiddleware)