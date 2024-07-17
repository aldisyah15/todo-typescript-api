import { ZodType, z } from "zod";

export class UserValidation {
    static REGISTER: ZodType = z.object({
        name: z.string().max(100).min(1),
        username: z.string().max(100).min(1),
        password: z.string().max(100).min(1),
        email: z.string().email()
    })

    static LOGIN: ZodType = z.object({
        email: z.string().email(),
        password: z.string().max(100).min(1),
    })

    static UPDATE: ZodType = z.object({
        name: z.string().max(100).min(1).optional(),
        password: z.string().max(100).min(1).optional()
    })
}