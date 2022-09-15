import { Router } from "express";
import authRoute from "./authRouter.js";
import testRoute from "./testRouter.js";

const router = Router();

router.use(authRoute);
router.use(testRoute)

export default router;