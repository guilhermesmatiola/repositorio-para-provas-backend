import { Router } from "express";
import { validateSchema } from "../middlewares/validators/schemasValidator";
import authSchema from "../middlewares/schemas/authSchema";
import loginSchema from "../middlewares/schemas/loginSchema";
import { signin, signup } from "../controllers/authController";

const authRoute = Router();

authRoute.post("/signin", validateSchema(loginSchema), signin);
authRoute.post("/signup", validateSchema(authSchema), signup);

export default authRoute;