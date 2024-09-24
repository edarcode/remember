import { z } from "zod";
import { Role } from "../db/schema";

export const roleSchema = z.enum([Role.chief, Role.client, Role.admin]);
