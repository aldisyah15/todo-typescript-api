import { Todolist } from "@prisma/client"

export type TodoRequest = {
    title: string
    description: string
}

export type UpdateCompleted = {
    completed: boolean
}

export type TodoResponse = {
    id_todo: string,
    title: string,
    description: string,
    createAt: string,
    completed: boolean,
}

export function ToResponse(todo: Todolist ) {
    return {
        id_todo: todo.id_todo,
        title: todo.title,
        description: todo.description,
        createAt: todo.createAt,
        completed: todo.completed,
    }
}