// src/validations/project-validation.ts
import { z } from "zod";

export const projectValidation = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["draft", "in_progress", "completed", "archived"], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
  engineerId: z
    .number()
    .int()
    .positive("Engineer ID must be a positive integer"),
});

export const projectUpdateValidation = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(["draft", "in_progress", "completed", "archived"]).optional(),
  engineerId: z.number().int().positive().optional(),
});
