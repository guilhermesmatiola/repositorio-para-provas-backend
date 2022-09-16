import app from "../src/index";
import supertest from "supertest";
import prisma from "../src/databases/database";
import createUserFactory from "./factories/authFactory"

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("Teste in /signup route", ()=>{

    it("return 201 - valid input", async()=>{
        const body = createUserFactory();

        const result = await supertest(app).post("/signup").send(body);
        const status =  result.status;

        const user = await prisma.users.findUnique({
            where: { email: body.email}
        });

        expect(status).toEqual(201);
        expect(user).not.toBeNull();
    });

    it("return 422 - invalid: input email", async () => {
		const body = createUserFactory();

		const result = await supertest(app).post("/signup").send({ ...body, email: "testeerrado.com" });
		const status = result.status;

		expect(status).toEqual(422);
	});

    it("return 422 - invalid: password confirmation", async ()=>{
        const body = createUserFactory();

        const result = await supertest(app).post("/signup").send({ ...body, confirmPassword: "testeerrado" });
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("return 422 - invalid: empty input", async ()=>{
        const body = {};

        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("return 422 - invalid: empty email", async ()=>{
        const body = createUserFactory();

        const result = await supertest(app).post("/signup").send({ ...body, email: null });
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("return 422 - invalid: empty password", async ()=>{
        const body = createUserFactory();

        const result = await supertest(app).post("/signup").send({ ...body, password: null });
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("return 422 - invalid: empty password confirmation", async ()=>{
        const body = createUserFactory();

        const result = await supertest(app).post("/signup").send({ ...body, confirmPassword: null });
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("returns 409 - user email already in use", async () => {
		const body = createUserFactory();

		await supertest(app).post("/signup").send(body);
		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		const user = await prisma.users.findUnique({
			where: { email: body.email },
		});
		expect(status).toEqual(409);
		expect(user).not.toBeNull();
	});


});

afterAll(async () => {
	await prisma.$disconnect();
});