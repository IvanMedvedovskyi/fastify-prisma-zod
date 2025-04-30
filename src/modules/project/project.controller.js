import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

import {
  projectValidation,
  projectUpdateValidation,
} from "../../validations/project-validation.js";

const createProject = async (request, reply) => {
  try {
    const body = projectValidation.parse(request.body);

    const newProject = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        engineers: {
          connect: { id: body.engineerId },
        },
      },
      include: { engineers: true },
    });

    return reply.code(201).send(newProject);
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

    return reply.code(500).send({ message: error.message });
  }
};

const getAllProjects = async (request, reply) => {
  try {
    const projects = await prisma.project.findMany({
      include: { engineers: true },
    });

    if (projects.length > 0) {
      return reply.code(200).send(projects);
    } else {
      return reply.code(404).send({ message: "Projects not found" });
    }
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getProjectById = async (request, reply) => {
  try {
    const projectId = parseInt(request.params.id);

    if (isNaN(projectId)) {
      return reply.code(400).send({ message: "Invalid project ID." });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        engineers: true,
        carPrototypes: true,
      },
    });

    if (project) {
      return reply.code(200).send(project);
    } else {
      return reply.code(404).send({ message: "Project not found." });
    }
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const updateProjectById = async (request, reply) => {
  try {
    const projectId = parseInt(request.params.id);
    const body = projectUpdateValidation.parse(request.body);

    if (isNaN(projectId)) {
      return reply.code(400).send({ message: "Invalid project ID." });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        engineers: {
          set: [],
          connect: { id: body.engineerId },
        },
      },
      include: { engineers: true },
    });

    return reply.code(200).send(updatedProject);
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

const deleteProjectById = async (request, reply) => {
  try {
    const projectId = parseInt(request.params.id);

    if (isNaN(projectId)) {
      return reply.code(400).send({ message: "Invalid project ID." });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return reply.code(404).send({ message: "Project not found." });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return reply.code(200).send({ message: "Project deleted successfully." });
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

export {
  createProject,
  getAllProjects,
  updateProjectById,
  deleteProjectById,
  getProjectById,
};
