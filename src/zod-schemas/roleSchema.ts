import { z } from "zod";
import { ROLE } from "../db/schema";

export const roleSchema = z.enum([ROLE.chief, ROLE.client, ROLE.admin]);
