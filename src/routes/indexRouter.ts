import { Router } from "express";
import authRoute from "./authRouter";
import testRoute from "./testRouter";

const router = Router();

router.use(authRoute);
router.use(testRoute)

export default router;