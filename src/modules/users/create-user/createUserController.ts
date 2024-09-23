import { Controller } from "../../../types";
import { createUserService } from "./createUserService";

export const createUserController: Controller = async (req, res, next) => {
  try {
    const newUser = req.body;
    await createUserService(newUser);
    res.status(201).json({ msg: "Successfully registered user" });
  } catch (error) {
    next(error);
  }
};
