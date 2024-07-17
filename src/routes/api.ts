import express from 'express';
import { UserController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { todoController } from '../controller/todo-controller';

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)
apiRouter.put('/api/update', UserController.Update)
apiRouter.post('/api/get', UserController.Get)


//todo
apiRouter.post('/create/todo', todoController.Create)
apiRouter.put('/create/todo', todoController.Complated)
apiRouter.delete('/create/todo/:id', todoController.Delete)