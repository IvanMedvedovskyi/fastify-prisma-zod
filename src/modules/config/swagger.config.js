export const swaggerOptions = {
  swagger: {
    info: {
      title: "API Documentation",
      description: "Документация к API проекта",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
};

export const swaggerUiOptions = {
  routePrefix: "/api-docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
};
