import { ZodSchema } from "zod";
import { Middleware } from "../types";

export const verifyQuery = (schema: ZodSchema): Middleware => {
  return (req, res, next) => {
    try {
      const query = schema.parse(req.query);
      res.locals = { ...res.locals, query };
      next();
    } catch (error) {
      next(error);
    }
  };
};
