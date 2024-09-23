import { EdarErr } from "../errors/EdarErr";
import { ErrHandler } from "../types";

export const errorHandler: ErrHandler = (error, _req, res, _next) => {
  if (error instanceof EdarErr) {
    const { status, msg } = error;
    return res.status(status).json({ msg });
  }

  return res.status(500).json(error);
};
