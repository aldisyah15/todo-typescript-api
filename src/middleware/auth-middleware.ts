import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../app/database";
import { User } from "@prisma/client";

export interface RequestUser extends Request {
    user?: User
}

export const authMiddleware = async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.get('X-API-TOKEN')

    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        })

        if (user) {
            req.user = user
            next()
            return
        }
    }

    res.status(401).json({
        errors: "Unautorized"
    }).end()
}

