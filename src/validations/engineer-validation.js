// src/validations/engineerValidation.js
import { z } from "zod";
import { EngineerSpeciality } from "@prisma/client";

const engineerValidation = z.object({
  name: z.string().min(1, "Name is required"),
  specialty: z.enum(
    [
      EngineerSpeciality.mechanical,
      EngineerSpeciality.electrical,
      EngineerSpeciality.aerodynamics,
      EngineerSpeciality.software,
    ],
    {
      errorMap: () => ({ message: "Invalid specialty" }),
    }
  ),
});

export default engineerValidation;
