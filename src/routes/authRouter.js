import { signIn, signUp } from "../controllers/authController.js";
import express from "express";
import validateUser from "../middlewares/userSchemaValidationMiddleware.js";
import validateLogin from "../middlewares/loginSchemaValidationMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-in", validateLogin, signIn);
authRouter.post("/sign-up", validateUser, signUp);

export default authRouter;
