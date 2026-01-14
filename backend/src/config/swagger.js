import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ReviewPlataform API",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
  },
  // eslint-disable-next-line no-undef
  apis: [path.resolve(process.cwd(), "src/routes/*.js")],
  // Dá um certo problema de diretório se colocar somente string mas da forma de acima funciona
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
