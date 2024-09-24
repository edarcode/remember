import { Role } from "../db/schema";
import { EdarErr } from "../errors/EdarErr";
import { Middleware } from "../types";

export const verifyRole = (role: Role): Middleware => {
  return (_req, res, next) => {
    try {
      const userRole = res.locals?.tokenPayload?.role;
      if (userRole !== role)
        throw new EdarErr({ status: 403, msg: "Unautorized role" });
      next();
    } catch (error) {
      next(error);
    }
  };
};
