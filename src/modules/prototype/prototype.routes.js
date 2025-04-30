// src/modules/prototype/prototype.routes.js
import {
  createNewPrototype,
  getPrototypeById,
  getAllPrototypes,
  updatePrototypeById,
  deletePrototypeById,
} from './prototype.controller.js';

const prototypeRoutes = async (fastify, options) => {
  // Create a new prototype
  fastify.post('/prototype', {
    schema: {
      tags: ['Car Prototype'],
      summary: 'Create a new car prototype',
      response: {
        201: { description: 'Prototype successfully created' },
        400: { description: 'Validation error - missing required fields' },
        404: { description: 'Project not found' },
        500: { description: 'Internal server error' },
      },
    },
    handler: createNewPrototype,
  });

  // Get prototype by ID
  fastify.get('/prototype/:id', {
    schema: {
      tags: ['Car Prototype'],
      summary: 'Get a car prototype by ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'integer', description: 'ID of the car prototype' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            version: { type: 'string' },
            status: { type: 'string' },
            text: { type: 'string' },
            project: { type: 'object' },
            testResult: { type: 'object' },
          },
        },
        400: { description: 'Invalid prototype ID' },
        404: { description: 'Prototype not found' },
        500: { description: 'Internal server error' },
      },
    },
    handler: getPrototypeById,
  });

  // Get all prototypes
  fastify.get('/prototype', {
    schema: {
      tags: ['Car Prototype'],
      summary: 'Get all car prototypes',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              version: { type: 'string' },
              status: { type: 'string' },
              text: { type: 'string' },
              project: { type: 'object' },
              testResult: { type: 'object' },
            },
          },
        },
        404: { description: 'No prototypes found' },
        500: { description: 'Internal server error' },
      },
    },
    handler: getAllPrototypes,
  });

  // Update prototype by ID
  fastify.put('/prototype/:id', {
    schema: {
      tags: ['Car Prototype'],
      summary: 'Update a car prototype by ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'integer', description: 'ID of the car prototype to update' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            version: { type: 'string' },
            status: { type: 'string' },
            text: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            projectId: { type: 'integer' },
          },
        },
        400: { description: 'Invalid prototype ID' },
        404: { description: 'Prototype not found' },
        500: { description: 'Internal server error' },
      },
    },
    handler: updatePrototypeById,
  });

  // Delete prototype by ID
  fastify.delete('/prototype/:id', {
    schema: {
      tags: ['Car Prototype'],
      summary: 'Delete a car prototype by ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'integer', description: 'ID of the car prototype to delete' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        400: {
          type: 'object',
          properties: {
            message: { type: 'string'},
          },
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        500: { description: 'Internal server error' },
      },
    },
    handler: deletePrototypeById,
  });
};

export default prototypeRoutes;
