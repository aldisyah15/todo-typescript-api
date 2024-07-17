# Setup Database ( Prisma ORM )

* Create a database in mysql
    ```
    create database ;
    ```
    *  To enter the table use the keyword use
    ```
    use ;
    ```

    * To see the contents of the table, use the keyword show tables
    ```
    show tables ;
    ```

# We create a table using prism orm

* setup prisma
    ```
    npx prisma init
    ```

* in the schema.prima file. change the provider property to mysql 
    ```
    datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
      }
    ```
* change database url
    ```
    DATABASE URL : 'mysql://PASSWORD@localhost:PORT/DATABASE' 
    ```

# Make model in prisma orm
* ```
  model User {
    username String @id @db.VarChar(100)
    password String @db.VarChar(100)
    name String @db.VarChar(100)
    token String? @db.VarChar(100)

    @@map("users")
  }
  ```
    * example for doing a one-to-many relationship
        * ```
             model User {
            id  Int @id @default(autoincrement())
            username String
            contacts Contact[]
            }

             model Contact {
            id        Int      @id @default(autoincrement())
            name      String
            phoneNumber String
            userId    Int
            user      User     @relation(fields: [userId], references: [id])
            }
          ```

# Generate model in prisma orm

* ```
    npx prisma migrate dev
  ```

