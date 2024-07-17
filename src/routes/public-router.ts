import express from 'express';
import { UserController } from '../controller/user-controller';

export const publicRouter = express.Router()
publicRouter.post('/user/register', UserController.Register)
publicRouter.post('/user/login', UserController.Login)