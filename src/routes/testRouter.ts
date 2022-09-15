import { Router } from "express";
import { validateSchema } from "../middlewares/validators/schemasValidator.js";
import verifyToken from "../middlewares/validators/verifyToken.js";
import testSchema from "../middlewares/schemas/testSchema.js"
import * as testController from "../controllers/testController.js";

const testRoute = Router();

testRoute.post("/test", validateSchema(testSchema), verifyToken, testController.newTest);
testRoute.get("/test/disciplines", testController.getAllTestsByDiscipline);

export default testRoute;