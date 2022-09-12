import { signIn, signUp } from "../controllers/authController.js";
import express from "express";
import validateUser from "../middlewares/userSchemaValidationMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-in", validateUser, signIn);
authRouter.post("/sign-up", validateUser, signUp);

export default authRouter;
