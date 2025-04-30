// src/validations/prototype-validation.ts
import { z } from "zod";

export const prototypeValidation = z.object({
  version: z.string().min(1, "Version is required"),
  status: z.enum(["designing", "building", "testing", "approved"], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
  text: z.string().min(1, "Text is required"),
  projectId: z.number().int().positive("Project ID must be a positive integer"),
});

export const prototypeUpdateValidation = z.object({
  version: z.string().min(1, "Version is required").optional(),
  status: z.enum(["designing", "building", "testing", "approved"]).optional(),
  text: z.string().min(1, "Text is required").optional(),
});
