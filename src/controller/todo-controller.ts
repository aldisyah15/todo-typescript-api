import { NextFunction, Response } from "express";
import { RequestUser } from "../middleware/auth-middleware";
import { TodoService } from "../service/todo-service";
import { TodoRequest } from "../model/todo-model";

export class todoController {
    static async Create(req: RequestUser, res: Response, next: NextFunction) {
        try {
            const request: TodoRequest = req.body as TodoRequest;
            const response = await TodoService.Create(req.user!, req.body)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async Complated(req: RequestUser, res: Response, next: NextFunction) {
       try {
        console.info("body Result " + JSON.stringify(req.body))
        console.info("User Result " + JSON.stringify(req.user!))
        const response = await TodoService.complated(req.user!, req.body)
        console.info("response Result " + JSON.stringify(response))


        res.status(200).json({
            data: response
        })
       } catch (e) {
        next(e)
       }
    }

    static async Delete(req: RequestUser, res: Response, next: NextFunction) {
        try {
            await TodoService.Delete(req.user!, JSON.stringify(req.params.id))
            console.info(req.params.id)
            res.status(200).json({
                data: "OK"
            })
        } catch (e) {
            next(e)
        }
    }
}   