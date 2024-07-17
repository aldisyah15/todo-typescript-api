import supertest from "supertest";
import { TodoTest, UserTest } from "./user.util";
import {web} from '../src/app/web';
import { logger } from "../src/app/logging";

describe('test register user', () => {
    afterEach(async () => {
        await UserTest.DELETE()
    })
    it('should register success', async() => {
        const response = await supertest(web)
        .post('/user/register')
        .send({
            username: 'test',
            name: 'test',
            password: 'test',
            email: 'test@gmail.com'
        })
        logger.debug(response)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')
        expect(response.body.data.email).toBe('test@gmail.com')
    });
});


describe('test login user', () => {
    beforeEach(async() => {
        await UserTest.DELETE();  // Await DELETE operation
        await UserTest.CREATE();  // Await CREATE operation
    });

    afterEach(async() => {
        await UserTest.DELETE();  // Await DELETE operation
    });

    it('should login success', async() => {
        const response = await supertest(web)
        .post('/user/login')
        .send({
            email: 'test@gmail.com',
            password: 'test'
        })

        logger.debug(response)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
    });

});

describe('Update user', () => {
    beforeEach(async() => {
       await UserTest.DELETE();  // Await DELETE operation
        await UserTest.CREATE();  // Await CREATE operation
    });

    afterEach(async() => {
        await UserTest.DELETE();  // Await DELETE operation
    });

    it('should password update',async () => {
        const response = await supertest(web)
        .put('/api/update')
        .set('X-API-TOKEN', 'test')   
        .send({
            name: "aldi"
        })
        logger.debug(response)
        expect(response.body.data.name).toBe('aldi')
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.email).toBe('test@gmail.com')
        expect(response.body.data.id).toBeDefined()
    });
});

describe('Get User', () => {
    beforeEach(async () => {
        await UserTest.CREATE()
    })

    afterEach(async() => {
        await UserTest.DELETE()
       
    })
    it('should get user', async () => {
        const response = await supertest(web)
        .post("/api/get")
        .set("X-API-TOKEN", "test")
        

        logger.debug(response)
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.email).toBe("test@gmail.com")
        expect(response.body.data.id).toBeDefined()
    });
});