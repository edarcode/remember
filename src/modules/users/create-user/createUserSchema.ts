import z from "zod";
import { emailSchema } from "../../../zod-schemas/emailSchema";
import { passwordSchema } from "../../../zod-schemas/passwordSchema";
import { nameSchema } from "../../../zod-schemas/nameSchema";
import { roleSchema } from "../../../zod-schemas/roleSchema";
import { imgSchema } from "../../../zod-schemas/imgSchema";

export const createUserSchema = z
  .object({
    name: nameSchema.optional(),
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema.optional(),
    img: imgSchema.optional(),
  })
  .strict();
