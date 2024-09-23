import { z } from "zod";
import { createUserSchema } from "./createUserSchema";
import { db } from "../../../db/db";
import { users } from "../../../db/schema";

export const createUserService = async (newUser: User) => {
  await db.insert(users).values({ ...newUser });
};

type User = z.infer<typeof createUserSchema>;
