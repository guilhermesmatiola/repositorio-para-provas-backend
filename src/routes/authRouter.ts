import { Router } from "express";
import { validateSchema } from "../middlewares/validators/schemasValidator.js";
import authSchema from "../middlewares/schemas/authSchema.js";
import loginSchema from "../middlewares/schemas/loginSchema.js";
import { signin, signup } from "../controllers/authController.js";

const authRoute = Router();

authRoute.post("/signin", validateSchema(loginSchema), signin);
authRoute.post("/signup", validateSchema(authSchema), signup);

export default authRoute;