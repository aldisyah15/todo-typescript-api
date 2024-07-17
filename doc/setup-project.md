# Setup struktur folder
    - src
        - app
            - database.ts
            - logging.ts
            - web.ts
        - controller
        - service
        - route
        - middleware
        - model
        - error
            - error.ts
        - validation
            - validation.ts
            - schema-validation.ts
        - main.ts


# Setup logging.ts
```
import winston from "winston";

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
}) 
```

# Setup database.ts
```
export const prismaClient = new PrismaClient({
    log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
})

prismaClient.$on('query', (e) => {
    logger.info(e)
})

prismaClient.$on('info', (e) => {
    logger.info(e)
})

prismaClient.$on('warn', (e) => {
    logger.info(e)
})

prismaClient.$on('error', (e) => {
    logger.error(e)
})
```

# Setup web.ts
```
export const web = express()
web.use(express.json())
```

# Setup validation.ts
```
import { ZodType } from "zod";

export class Validation {
    static validate<T>(schema: ZodType, data: T):T {
        return schema.parse(data)
    }
}
```
  *  schema-validation.ts
  ```
 import { ZodType, z } from "zod";

export class UserValidaton {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().max(100).min(1),
    password: z.string().max(100).min(1),
    name: z.string().max(100).min(1),
  });

}
  ```

# Setup error.ts
  ```
    export class ResponseError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }
}
  ```