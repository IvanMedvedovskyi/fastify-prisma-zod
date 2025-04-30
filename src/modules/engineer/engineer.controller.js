import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import engineerValidation from "../../validations/engineer-validation.js";
const prisma = new PrismaClient();

const addEngineer = async (request, reply) => {
  try {
    const body = engineerValidation.parse(request.body);

    const newEngineer = await prisma.engineer.create({
      data: body,
    });

    return reply.code(201).send(newEngineer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.map((err) => ({
        message: err.message,
        path: err.path.join("."),
      }));

      return reply
        .code(400)
        .send({ message: "Invalid input data", errors: validationErrors });
    }
    return reply.code(500).send({ error: error.message });
  }
};

const getAllEngineers = async (request, reply) => {
  try {
    const engineers = await prisma.engineer.findMany({
      include: { projects: true },
    });

    if (engineers.length > 0) {
      return reply.code(200).send(engineers);
    } else {
      return reply.code(404).send({ message: "Engineers not found" });
    }
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const assignEngineerToProject = async (request, reply) => {
  try {
    const projectId = parseInt(request.params.projectID);
    const { engineerId } = request.body;

    if (!engineerId) {
      return reply.code(400).send({ message: "Engineer ID is required" });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: {
        engineers: {
          connect: { id: engineerId },
        },
      },
    });

    return reply
      .code(200)
      .send({ message: "Engineer assigned to project successfully" });
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getEngineerById = async (request, reply) => {
  try {
    const engineerId = parseInt(request.params.id);

    if (!engineerId) {
      return reply.code(400).send({ message: "Engineer ID is required" });
    }

    const engineer = await prisma.engineer.findUnique({
      where: { id: engineerId },
      include: { projects: true },
    });

    if (!engineer) {
      return reply.code(404).send({ message: "Engineer not found" });
    }

    return reply.code(200).send(engineer);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const updateEngineerById = async (request, reply) => {
  try {
    const engineerId = parseInt(request.params.id);

    const body = engineerValidation.parse(request.body);

    const updatedEngineer = await prisma.engineer.update({
      where: { id: engineerId },
      data: body,
    });

    return reply.code(200).send(updatedEngineer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.map((err) => ({
        message: err.message,
        path: err.path.join("."),
      }));

      return reply
        .code(400)
        .send({ message: "Invalid input data", errors: validationErrors });
    }
    
    return reply.code(500).send({ error: error.message });
  }
};

export {
  addEngineer,
  getAllEngineers,
  assignEngineerToProject,
  getEngineerById,
  updateEngineerById,
};
