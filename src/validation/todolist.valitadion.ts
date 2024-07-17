import { ZodType, z } from "zod";

export class TodoList_Schema {
    static CREATE: ZodType = z.object({
        title: z.string().min(1).max(20),
        description: z.string()
    })

    static COMPLATED: ZodType = z.object({
        completed: z.boolean()
    })
}