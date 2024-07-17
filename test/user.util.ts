import {prismaClient} from '../src/app/database';
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
export class UserTest {
    static async DELETE() {
        await prismaClient.user.deleteMany({
            where: {
                username: 'test'
            }
        })
    }

    static async CREATE() {
        await prismaClient.user.create({
            data: {
                name: "test",
                password: await bcrypt.hash("test", 10),
                email: "test@gmail.com",
                username: "test",
                id: uuid(),
                token: "test"
            }
        })
    }
}

export class TodoTest {
    static async DELETE() {
        await prismaClient.todolist.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    static async CREATE() {
        await prismaClient.todolist.create({
           data: {
            id_todo: "test",
            title: "cara buat",
            description: "hahahahahahahhaha",
            createAt: "29-06-2024",
            username: "test"
           }
        })
    }
}