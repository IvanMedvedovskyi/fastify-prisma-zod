// src/modules/engineer/engineer.routes.js
import {
  addEngineer,
  getAllEngineers,
  assignEngineerToProject,
  getEngineerById,
  updateEngineerById,
} from "./engineer.controller.js";

const engineerRoutes = async (fastify, options) => {
  // Get all engineers
  fastify.get("/engineers", {
    schema: {
      tags: ["Engineers"],
      summary: "Get all engineers",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              specialty: { type: "string" },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
    handler: getAllEngineers,
  });

  // Add a new engineer
  fastify.post("/engineers", {
    schema: {
      tags: ["Engineers"],
      summary: "Add a new engineer",
      response: {
        201: { description: "Engineer successfully added" },
        400: { description: "Missing required fields" },
        500: { description: "Internal server error" },
      },
    },
    handler: addEngineer,
  });

  // Assign engineer to a project
  fastify.put("/engineers/:projectID/assign", {
    schema: {
      tags: ["Engineers"],
      summary: "Assign an engineer to a project",
      params: {
        type: "object",
        required: ["projectID"],
        properties: {
          projectID: { type: "integer", description: "Project ID" },
        },
      },
      body: {
        type: "object",
        required: ["engineerId"],
        properties: {
          engineerId: { type: "integer", description: "Engineer ID" },
        },
      },
      response: {
        200: { description: "Engineer assigned to project successfully" },
        400: { description: "Invalid input or missing fields" },
        404: { description: "Engineer or Project not found" },
        500: { description: "Internal server error" },
      },
    },
    handler: assignEngineerToProject,
  });

  // Get engineer by ID
  fastify.get("/engineers/:id", {
    schema: {
      tags: ["Engineers"],
      summary: "Get engineer by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "Engineer ID" },
        },
      },
      querystring: {
        type: "object",
        properties: {
          withProjects: {
            type: "boolean",
            description: "Include assigned projects",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            specialty: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  engineerId: { type: "integer" },
                  projectId: { type: "integer" },
                  assignedAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        400: { description: "Invalid engineer ID" },
        404: { description: "Engineer not found" },
        500: { description: "Internal server error" },
      },
    },
    handler: getEngineerById,
  });

  // Update engineer by ID
  fastify.put("/engineers/:id", {
    schema: {
      tags: ["Engineers"],
      summary: "Update engineer by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "Engineer ID" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            specialty: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        400: { description: "Invalid engineer ID or missing fields" },
        404: { description: "Engineer not found" },
        500: { description: "Internal server error" },
      },
    },
    handler: updateEngineerById,
  });
};

export default engineerRoutes;
