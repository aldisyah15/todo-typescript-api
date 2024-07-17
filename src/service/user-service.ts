import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/error";
import { CreateUserRequest, LoginRequest, ToUserResponse, UpdateRequest, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { validation } from "../validation/validation";
import bcrypt from 'bcrypt';
import {v4 as uuid } from 'uuid';

export class UserService {

    static async Register(request: CreateUserRequest): Promise<UserResponse> {
        const validationRegister = validation.validate(UserValidation.REGISTER, request)

        const totalUser = await prismaClient.user.count({
            where: {
                username: validationRegister.username
            }
        }) 

        if (totalUser === 1) {
            throw new ResponseError(400, "username already exist")
        }

        validationRegister.password = await bcrypt.hash(validationRegister.password, 10)
        
        const record = {
            ...validationRegister,
            ...{id: uuid()}
        }
        

       const user = await prismaClient.user.create({
            data: record
        })

     return  ToUserResponse(user)
    } 

    static async Login(request: LoginRequest): Promise<UserResponse> {
        const validationLogin = validation.validate(UserValidation.LOGIN, request)

        const user = await prismaClient.user.findUnique({
            where: {
                email: validationLogin.email
            }
        })

        if (!user) {
            throw new ResponseError(404, 'username or password is wrong')
        }

        const isPasswordValid = await bcrypt.compare(validationLogin.password, user.password)

        if (!isPasswordValid) {
            throw new ResponseError(404, 'username or password is wrong')
        }

        const userUpdate = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                token: uuid()
            }
        })

        return ToUserResponse(userUpdate)
    }

    static async Update(user: User, request: UpdateRequest): Promise<UserResponse> {
        const validationUpdate = validation.validate(UserValidation.UPDATE, request)
        console.log('Update Result:', request)

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                name: validationUpdate.name
            }
        })

        return ToUserResponse(result)
    }

    static async Get(user: User): Promise<UserResponse> {
        return ToUserResponse(user)
    }
}