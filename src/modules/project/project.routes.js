// src/modules/project/project.routes.js
import {
  createProject,
  getAllProjects,
  updateProjectById,
  deleteProjectById,
  getProjectById,
} from "./project.controller.js";

const projectRoutes = async (fastify, options) => {
  // Create project
  fastify.post("/project", {
    schema: {
      tags: ["Projects"],
      summary: "Create a new project",
      response: {
        201: { description: "Project successfully created" },
        400: { description: "Missing required fields" },
        500: { description: "Internal server error" },
      },
    },
    handler: createProject,
  });

  // Get all projects
  fastify.get("/project", {
    schema: {
      tags: ["Projects"],
      summary: "Get all projects",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              description: { type: "string" },
              status: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
    handler: getAllProjects,
  });

  // Update project
  fastify.put("/project/:id", {
    schema: {
      tags: ["Projects"],
      summary: "Update a project by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID of the project to update" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            status: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        400: { description: "Invalid project ID or bad request" },
        404: { description: "Project not found" },
        500: { description: "Internal server error" },
      },
    },
    handler: updateProjectById,
  });

  // Delete project
  fastify.delete("/project/:id", {
    schema: {
      tags: ["Projects"],
      summary: "Delete a project by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID of the project to delete" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        400: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        500: { description: "Internal server error" },
      },
    },
    handler: deleteProjectById,
  });

  // Get project by ID
  fastify.get("/project/:id", {
    schema: {
      tags: ["Projects"],
      summary: "Get a project by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID of the project to retrieve" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            status: {
              type: "string",
              enum: ["draft", "in_progress", "completed", "archived"],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        400: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        500: { description: "Internal server error" },
      },
    },
    handler: getProjectById,
  });
};

export default projectRoutes;
