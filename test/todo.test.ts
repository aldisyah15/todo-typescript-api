import supertest from "supertest";
import { TodoTest, UserTest } from "./user.util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe('create todo', () => {
    beforeAll(async () => {
        await UserTest.DELETE()
        await UserTest.CREATE()
    })

    afterEach(async () => {
        await TodoTest.DELETE()
    })
    it('should create todo',async () => {
        const response = await supertest(web)
        .post('/create/todo')
        .set("X-API-TOKEN", 'test')
        .send({
            title: "Bagaimana cara",
            description: "saya tidak memesan bla bla akaakakakkakakakkakakakakkakakakakakka",
        })
        logger.debug(response)
        expect(response.status).toBe(200)
        expect(response.body.data.title).toBe("Bagaimana cara")
        expect(response.body.data.description).toBe( "saya tidak memesan bla bla akaakakakkakakakkakakakakkakakakakakka")
        expect(response.body.data.complated).toBeFalsy()
    });
});

describe('completed', () => {
    beforeEach(async() => {
        await UserTest.DELETE()
        await UserTest.CREATE()
        await TodoTest.CREATE()
    })

    afterEach(async() => {
        await TodoTest.DELETE()

    })
    it('', async () => {
        const response = await supertest(web)
        .put("/create/todo")
        .set("X-API-TOKEN", "test")
        .send({
            completed: true
        })

        logger.debug(response)
        expect(response.status).toBe(200)
    });
});

describe('Delete', () => {
    beforeEach(async() => {
        await UserTest.DELETE()
        await UserTest.CREATE()
        await TodoTest.CREATE()
    })

    afterEach(async() => {
        await TodoTest.DELETE()
       // await UserTest.DELETE()
    })
    it('', async () => {
        const response = await supertest(web)
        .delete("/create/todo/test")
        .set("X-API-TOKEN", "test")

        logger.debug(response)

        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")

    });
});