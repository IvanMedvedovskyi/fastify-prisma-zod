import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import {
  prototypeValidation,
  prototypeUpdateValidation,
} from "../../validations/prototype-validation.js";

const prisma = new PrismaClient();

const createNewPrototype = async (request, reply) => {
  try {
    const body = prototypeValidation.parse(request.body);

    const project = await prisma.project.findUnique({
      where: { id: body.projectId },
    });

    if (!project) {
      return reply.code(404).send({ message: "Project not found" });
    }

    const newCarPrototype = await prisma.carPrototype.create({
      data: {
        version: body.version,
        status: body.status,
        text: body.text,
        project: {
          connect: { id: body.projectId },
        },
      },
    });

    return reply.code(201).send(newCarPrototype);
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

    return reply.code(500).send({ error: error.message });
  }
};

const getAllPrototypes = async (request, reply) => {
  try {
    const prototypes = await prisma.carPrototype.findMany({
      include: {
        project: true,
        testResults: true,
      },
    });

    if (prototypes) {
      return reply.code(200).send(prototypes);
    } else {
      return reply.code(404).send({ message: "Prototypes not found" });
    }
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getPrototypeById = async (request, reply) => {
  try {
    const prototypeId = parseInt(request.params.id, 10);

    if (isNaN(prototypeId)) {
      return reply.code(400).send({ message: "Invalid prototype ID." });
    }

    const carPrototype = await prisma.carPrototype.findUnique({
      where: { id: prototypeId },
      include: { project: true },
    });

    if (carPrototype) {
      return reply.code(200).send(carPrototype);
    } else {
      return reply.code(404).send({ message: "Prototype not found." });
    }
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const updatePrototypeById = async (request, reply) => {
  try {
    const prototypeId = parseInt(request.params.id, 10);
    const body = prototypeUpdateValidation.parse(request.body);

    if (isNaN(prototypeId)) {
      return reply.code(400).send({ message: "Invalid prototype ID." });
    }

    const updatedPrototype = await prisma.carPrototype.update({
      where: { id: prototypeId },
      data: {
        ...(body.version && { version: body.version }),
        ...(body.status && { status: body.status }),
        ...(body.text && { text: body.text }),
      },
    });

    return reply.code(200).send(updatedPrototype);
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

    return reply.code(500).send({ error: error.message });
  }
};

const deletePrototypeById = async (request, reply) => {
  try {
    const prototypeId = parseInt(request.params.id, 10);

    if (isNaN(prototypeId)) {
      return reply.code(400).send({ message: "Invalid prototype ID." });
    }

    const prototype = await prisma.carPrototype.findUnique({
      where: { id: prototypeId },
    });

    if (!prototype) {
      return reply.code(404).send({ message: "Prototype not found." });
    }

    await prisma.carPrototype.delete({
      where: { id: prototypeId },
    });

    return reply.code(200).send({ message: "Prototype deleted successfully." });
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

export {
  createNewPrototype,
  deletePrototypeById,
  getAllPrototypes,
  getPrototypeById,
  updatePrototypeById,
};
