// src/modules/test/test.controller.js
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { testResultValidation } from "../../validations/test-validation.js";

const prisma = new PrismaClient();

const createTestResult = async (request, reply) => {
  try {
    const prototypeId = parseInt(request.params.prototypeID, 10);

    if (isNaN(prototypeId)) {
      return reply.code(400).send({ message: "Invalid prototype ID." });
    }

    const body = testResultValidation.parse(request.body);

    const newTestResult = await prisma.testResult.create({
      data: {
        prototype: { connect: { id: prototypeId } },
        testType: body.testType,
        result: body.result,
        passed: body.passed,
        comments: body.comments,
      },
    });

    return reply.code(201).send(newTestResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.map((err) => ({
        message: err.message,
        path: err.path.join("."),
      }));

      return reply.code(400).send({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    return reply.code(500).send({ message: error.message });
  }
};

const getAllTestResults = async (request, reply) => {
  try {
    const testsList = await prisma.testResult.findMany({
      include: { prototype: true },
    });

    if (testsList.length > 0) {
      return reply.code(200).send(testsList);
    } else {
      return reply.code(404).send({ message: "Test results not found" });
    }
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

const getTestById = async (request, reply) => {
  try {
    const testId = parseInt(request.params.testId, 10);

    if (isNaN(testId)) {
      return reply.code(400).send({ message: "Invalid test ID." });
    }

    const isPrototypeInclude = request.query.withPrototype === "true";

    const findTest = await prisma.testResult.findUnique({
      where: { id: testId },
      include: isPrototypeInclude ? { prototype: true } : undefined,
    });

    if (!findTest) {
      return reply.code(404).send({ message: "Test result not found." });
    }

    return reply.code(200).send(findTest);
  } catch (error) {
    return reply.code(500).send({ message: "Error retrieving test result." });
  }
};

export { createTestResult, getAllTestResults, getTestById };
