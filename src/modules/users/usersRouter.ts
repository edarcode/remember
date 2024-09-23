import { Router } from "express";
import { createUserRouter } from "./create-user/createUserRouter";

export const usersRouter = Router();

usersRouter.use("/create-user", createUserRouter);
usersRouter.use("/read-user", () => {});
