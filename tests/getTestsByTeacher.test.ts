import app from "../src/index";
import supertest from "supertest";
import prisma from "../src/databases/database";

async function login() {

    const body = {
        email: "testeecreate@testemail.com",
        password: "testeecreate@testemail.com",
        confirmPassword: "testeecreate@testemail.com",
    };
    await supertest(app).post("/signup").send(body);
  
    const user = {
        email: "testeecreate@testemail.com",
        password: "testeecreate@testemail.com",
    };
    const userLogin = await supertest(app).post("/signin").send(user);

    return userLogin.text
}

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Testing route GET /discipline", () => {

    it("return 200 - success get tests disicpline", async () => {
        const token = await login();

        const result = await supertest(app).get("/test/teacher").set({ Authorization: `Bearer ${token}`, Accept: "application/json" }).send();
        const status = result.status;

        expect(status).toEqual(200)
        expect(result.body).toBeInstanceOf(Object);
    });

    it("return 401 - wrong token", async () => {
       
        const token = "wrong token";

        const result = await supertest(app).get(`/test/teacher`).set({ Authorization: `Bearer ${token}` }).send();
        expect(result.status).toEqual(401);
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});