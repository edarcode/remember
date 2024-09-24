import jwt from "jsonwebtoken";
import { Middleware } from "../types";
import { EdarErr } from "../errors/EdarErr";
import { JWT } from "../config/jwt";

export const verifyToken: Middleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new EdarErr({ status: 404, msg: "Unauthorized" });

    jwt.verify(token, JWT.secret as string, (err, tokenPayload) => {
      if (err) throw new EdarErr({ status: 401, msg: "Unauthorized token" });
      res.locals = { ...res.locals, tokenPayload };
      next();
    });
  } catch (error) {
    next(error);
  }
};
