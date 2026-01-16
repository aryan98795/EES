import { z } from "zod";

export const signupSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin", "coordinator"])
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
});
