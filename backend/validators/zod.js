import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(2,"Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string(),
});

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string("Invalid password"),
});
