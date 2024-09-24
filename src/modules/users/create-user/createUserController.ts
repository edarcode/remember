import { z } from "zod";
import { Controller } from "../../../types";
import { createUserService } from "./createUserService";
import { createUserSchema } from "./createUserSchema";

export const createUserController: Controller = async (_req, res, next) => {
  try {
    const newUser = res.locals?.body as Body;
    await createUserService(newUser);
    res.status(201).json({ msg: "Successfully registered user" });
  } catch (error) {
    next(error);
  }
};

type Body = z.infer<typeof createUserSchema>;
