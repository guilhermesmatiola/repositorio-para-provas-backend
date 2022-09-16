import { Router } from "express";
import { validateSchema } from "../middlewares/validators/schemasValidator";
import verifyToken from "../middlewares/validators/verifyToken";
import testSchema from "../middlewares/schemas/testSchema"
import * as testController from "../controllers/testController";

const testRoute = Router();

testRoute.post("/test", validateSchema(testSchema), verifyToken, testController.newTest);
testRoute.get("/test/disciplines", testController.getAllTestsByDiscipline);
testRoute.get("/test/teacher", testController.getAllTestsByTeacher);

export default testRoute;