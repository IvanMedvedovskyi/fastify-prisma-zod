// src/validations/test-validation.ts
import { z } from "zod";

export const testResultValidation = z.object({
  testType: z.string().min(1, "Test type is required"),
  result: z.number({ invalid_type_error: "Result must be a number" }),
  passed: z.boolean({ invalid_type_error: "Passed must be a boolean" }),
  comments: z.string().optional(),
});
