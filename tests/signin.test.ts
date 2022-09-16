import app from "../src/index";
import supertest from "supertest";
import prisma from "../src/databases/database";
import loginUserFactory from "./factories/signinFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Test in /signin route", () => {
    it("return 200 - valid input login", async () => {

        const body = loginUserFactory();

        await supertest(app).post("/signup").send(body);

        const newUser = {
            email: body.email,
            password: body.password,
            };

        const result = await supertest(app).post("/signin").send(newUser);
        const status = result.status;
        const token = result.text;

        expect(status).toEqual(200);
        expect(typeof token).toBe("string");
    });

    it("return 401 - invalid: unauthorized: incorrect email or incorrect password ", async () => {
        
        const body = loginUserFactory();

        await supertest(app).post("/signup").send(body);

        const newUser = {
            email: "emailerrado@email.com",
            password: body.password,
            };
        const result = await supertest(app).post("/signin").send(newUser);
        const status = result.status;

        expect(status).toEqual(401);
    });

    it("return 401 - invalid: unauthorized: incorrect email or incorrect password", async () => {
        
        const body = loginUserFactory();

        await supertest(app).post("/signup").send(body);

        const newUser = {
            email: body.email,
            password: "senhaerrada",
            };

        const result = await supertest(app).post("/signin").send(newUser);
        const status = result.status;

        expect(status).toEqual(401);
    });

    it("return 422 - invalid: empty email", async () => {
        
        const body = loginUserFactory();

        await supertest(app).post("/signup").send(body);

        const newUser = {
        email: null,
        password: body.password,
        };

        const result = await supertest(app).post("/signin").send(newUser);
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("return 422 - invalid: empty password", async () => {
        
        const body = loginUserFactory();

        await supertest(app).post("/signup").send(body);

        const newUser = {
        email: body.email,
        password: null,
        };

        const result = await supertest(app).post("/signin").send(newUser);
        const status = result.status;

        expect(status).toEqual(422);
    });
});

afterAll(async () => {
  await prisma.$disconnect();
});