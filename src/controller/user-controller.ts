import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import { logger } from "../app/logging";
import {RequestUser, authMiddleware} from '../middleware/auth-middleware';

export class UserController {
    static async Register(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.Register(req.body)
           console.info(req.body)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.Login(req.body)
            logger.debug(response)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async Update(req: RequestUser, res: Response, next: NextFunction) {
            try {
                const response = await UserService.Update(req.user!, req.body)
                res.status(200).json({
                    data: response
                })
            } catch (e) {
                next(e)
            }
    }

     static async Get(req: RequestUser, res: Response, next: NextFunction) {
        try {
            const response = await UserService.Get(req.user!)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
     }
}