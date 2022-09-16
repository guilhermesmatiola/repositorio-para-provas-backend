import app from "../src/index";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import prisma from "../src/databases/database";
import loginUserFactory from "../tests/factories/signinFactory"
import testFactory from "../tests/factories/testFactory"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
});

async function login() {

    const body = {
        email: "testcreate@testemail.com",
        password: "testcreate@testemail.com",
        confirmPassword: "testcreate@testemail.com",
    };
    await supertest(app).post("/signup").send(body);
  
    const user = {
        email: "testcreate@testemail.com",
        password: "testcreate@testemail.com",
    };
    const userLogin = await supertest(app).post("/signin").send(user);

    return userLogin.text
}

describe("Test /tests routes", () => {
	it("return 201 - valid input create test", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ Authorization: `Bearer ${token}`, Accept: "application/json" }).send(body);
		const status = result.status;

		expect(status).toEqual(201);
	});

	it("return 422 - invalid input: empty name", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ Authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, name: "" });
        const status = result.status;

		expect(status).toEqual(422);
	});

	it("return 422 - invalid input: empty pdfUrl", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, pdfUrl: "" });
        const status = result.status;

		expect(status).toEqual(422);
	});

	it("return 422 - invalid input: empty category", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, category: "" });
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("return 422 - invalid input: empty discipline", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, discipline: "" });
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("return 422 - invalid input: empty teacher", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, teacher: "" });
        const status = result.status;

		expect(status).toEqual(422);
	});

	it("return 422 - invalid input: wrong type of url", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, pdfUrl: "wrongtypeofURL" });
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("return 404 - discipline doesn't exist", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, discipline: "discpline doesnt exist" });
		const status = result.status;

		expect(status).toEqual(404);
	});

	it("return 404 - teacher doesn't exist", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, teacher: "teacher doesnt exist" });
        const status = result.status;

		expect(status).toEqual(404);
	});

	it("return 404 - category doesn't exist", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer ${token}`, Accept: "application/json" }).send({ ...body, category: "category doenst exist" });
    	const status = result.status;

		expect(status).toEqual(404);
	});

	it("return 401 - invalid token", async () => {
		const body = await testFactory();
		const token = await login();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer TEST${token}`, Accept: "application/json" }).send(body);
		const status = result.status;

		expect(status).toEqual(401);
	});

	it("return 401 - empty token", async () => {
		const body = await testFactory();

		const result = await supertest(app).post("/test").set({ authorization: `Bearer `, Accept: "application/json" }).send(body);
		const status = result.status;

		expect(status).toEqual(401);
	});
});

afterAll(async () => {
	await prisma.$disconnect();
});