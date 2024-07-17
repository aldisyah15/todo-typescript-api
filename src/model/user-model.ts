import { User } from "@prisma/client"

export type UserResponse = {
    name: string,
    username: string,
    email: string,
    id?: string | null
    token?: string | null
}

export type CreateUserRequest = {
    name: string,
    username: string,
    email: string,
    password: string,
}

export type LoginRequest = {
    email: string,
    password: string
}

export type UpdateRequest = {
    name?: string 
}

export function ToUserResponse(user: User): UserResponse {
    return {
        name: user.name,
        username: user.username,
        email: user.email,
        id: user.id,
    }
}