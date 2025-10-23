import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Seleções Copa do Mundo 2022",
      version: "1.0.0",
      description: "API para gerenciar seleções da Copa do Mundo 2022.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"], // ← mudou de .js para .ts
};

export const specs = swaggerJSDoc(options);
