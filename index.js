// index.js
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import engineerRoutes from "./src/modules/engineer/engineer.routes.js";
import projectRoutes from "./src/modules/project/project.routes.js";
import prototypeRoutes from "./src/modules/prototype/prototype.routes.js";
import testRoutes from "./src/modules/tests/test.routes.js";

import {
  swaggerOptions,
  swaggerUiOptions,
} from "./src/modules/config/swagger.config.js";

const fastify = Fastify({ logger: true });

fastify.setSerializerCompiler(() => JSON.stringify);

// Swagger
await fastify.register(swagger, swaggerOptions);
await fastify.register(swaggerUi, swaggerUiOptions);

fastify.register(engineerRoutes, { prefix: "/api" });
fastify.register(projectRoutes, { prefix: "/api" });
fastify.register(prototypeRoutes, { prefix: "/api" });
fastify.register(testRoutes, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
