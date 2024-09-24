import { z } from "zod";
import { createUserSchema } from "./createUserSchema";
import { db } from "../../../db/db";
import { users } from "../../../db/schema";
import bcrypt from "bcrypt";
import { BCRYPT } from "../../../config/bcrypt";

export const createUserService = async (newUser: User) => {
  await db
    .insert(users)
    .values({
      ...newUser,
      password: await bcrypt.hash(newUser.password, BCRYPT.salt),
    });
};

type User = z.infer<typeof createUserSchema>;
