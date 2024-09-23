import { Router } from "express";
import { createUserController } from "./createUserController";

export const createUserRouter = Router();

createUserRouter.post("", createUserController);
