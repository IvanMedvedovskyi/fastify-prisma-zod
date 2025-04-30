// src/modules/test/test.routes.js
import {
  createTestResult,
  getAllTestResults,
  getTestById,
} from "./test.controller.js";

const testRoutes = async (fastify, options) => {
  // Create a new test result
  fastify.post("/test-result/:prototypeID", {
    schema: {
      tags: ["Test Results"],
      summary: "Create a new test result for a prototype",
      params: {
        type: "object",
        required: ["prototypeID"],
        properties: {
          prototypeID: { type: "integer", description: "ID of the prototype" },
        },
      },
      body: {
        type: "object",
        required: ["testType", "result", "passed"],
        properties: {
          testType: { type: "string" },
          result: { type: "string" },
          passed: { type: "boolean" },
          comments: { type: "string"},
          durationSeconds: { type: "integer" },
          testDate: {
            type: "string",
            format: "date-time",
          },
        },
      },
      response: {
        201: { description: "Test result successfully created" },
        400: { description: "Invalid request" },
        500: { description: "Internal server error" },
      },
    },
    handler: createTestResult,
  });

  // Get all test results
  fastify.get("/test-result", {
    schema: {
      tags: ["Test Results"],
      summary: "Get all test results",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              prototypeId: { type: "integer" },
              testType: { type: "string" },
              result: { type: "string" },
              passed: { type: "boolean" },
              comments: { type: "string", nullable: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              prototype: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  version: { type: "string" },
                  status: { type: "string" },
                  text: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" },
                  projectId: { type: "integer" },
                },
              },
            },
          },
        },
        404: { description: "No test results found" },
        500: { description: "Internal server error" },
      },
    },
    handler: getAllTestResults,
  });

  // Get test result by ID
  fastify.get("/test-result/:testId", {
    schema: {
      tags: ["Test Results"],
      summary: "Get a test result by ID",
      params: {
        type: "object",
        required: ["testId"],
        properties: {
          testId: { type: "integer", description: "ID of the test result" },
        },
      },
      querystring: {
        type: "object",
        properties: {
          withPrototype: {
            type: "boolean",
            description: "Include prototype details",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "integer" },
            prototypeId: { type: "integer" },
            testType: { type: "string" },
            result: { type: "string" },
            passed: { type: "boolean" },
            comments: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            prototype: {
              type: "object",
              nullable: true,
              properties: {
                id: { type: "integer" },
                version: { type: "string" },
                status: { type: "string" },
                text: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
                projectId: { type: "integer" },
              },
            },
          },
        },
        400: { description: "Invalid test ID" },
        404: { description: "Test result not found" },
        500: { description: "Internal server error" },
      },
    },
    handler: getTestById,
  });
};

export default testRoutes;
