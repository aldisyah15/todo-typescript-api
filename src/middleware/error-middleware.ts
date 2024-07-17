import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/error";
import { ZodError } from "zod";

export const errorMiddleware =async (error: Error, req: Request,  res: Response, next: NextFunction)=> {
    if (error instanceof ZodError) {
        res.status(400).json({
            errors: `Validation error ${JSON.stringify(error)}` 
        })
    } else if (error instanceof ResponseError) {
        res.status(400).json({
            errors: error.message
        })
    } else {
        res.status(500).json({
            errors: error.message
        })
    }
}