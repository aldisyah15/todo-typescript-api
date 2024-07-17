import {v4 as uuid} from 'uuid';
import {TodoList_Schema} from '../validation/todolist.valitadion';
import { ToResponse, TodoRequest, TodoResponse, UpdateCompleted } from '../model/todo-model';
import { validation } from '../validation/validation';
import { User } from '@prisma/client';
import { prismaClient } from '../app/database';
import {format} from 'date-fns';
import { z } from 'zod';
const now = new Date();
const formattedDate = format(now, "yyyy-mm-dd HH-mm")


export class TodoService{
    static async Create(user: User, todo: TodoRequest): Promise<TodoResponse> {

        const validationTodo = validation.validate(TodoList_Schema.CREATE, todo)
      
        const record = {
            ...validationTodo,
            ...{id_todo: uuid()},
            ...{createAt:  formattedDate},
            ...{username: user.username}
        }

        const result = await prismaClient.todolist.create({
            data: record
        })

        return ToResponse(result)
    }

    static async complated(user: User, complated: UpdateCompleted ): Promise<TodoResponse> {
        const ValidationBoolean = validation.validate(TodoList_Schema.COMPLATED, complated)
        console.info("ValidationBoolean Result " + JSON.stringify(ValidationBoolean))
        const result = await prismaClient.todolist.update({
            where: {
                username: user.username,
            },
            data: {
                completed: ValidationBoolean.completed
            }
        })
        return result
    }

    static async Delete(user: User,idRequest: string) {
        const IsID = await prismaClient.todolist.findFirst({
            where: {
                id_todo: idRequest,
                username: user.username
            }
        })

        const DeleteTodo = await prismaClient.todolist.delete({
            where: {
                id_todo: IsID?.id_todo
            }
        })

        return ToResponse(DeleteTodo)

        
    }

}