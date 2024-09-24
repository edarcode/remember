import { Router } from "express";
import { createUserController } from "./createUserController";
import { verifyBody } from "../../../middlewares/verifyBody";
import { createUserSchema } from "./createUserSchema";

export const createUserRouter = Router();

createUserRouter.post("", verifyBody(createUserSchema), createUserController);
