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
    components: {
      schemas: {
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "usuario@email.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              type: "string",
              example: "teste1",
              minLength: 3,
            },
            email: {
              type: "string",
              example: "usuario@email.com",
            },
            password: {
              type: "string",
              example: "123456",
              minLength: 6,
            },
          },
        },
        ReviewRequest: {
          type: "object",
          required: ["courseId", "rating"],
          properties: {
            courseId: {
              type: "string",
              example: "123456789012345678901234",
            },
            rating: {
              type: "number",
              example: 5,
              minimum: 1,
              maximum: 5,
            },
            comment: {
              type: "string",
              example: "Muito bom",
            },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            username: {
              type: "string",
              example: "teste1",
              minLength: 3,
            },
            email: {
              type: "string",
              example: "usuario@email.com",
            },
            password: {
              type: "string",
              example: "123456",
              minLength: 6,
            },
          },
        },
        CreateCourseRequest: {
          type: "object",
          required: [
            "title",
            "description",
            "category",
            "imageUrl",
            "createdBy",
          ],
          properties: {
            title: {
              type: "string",
              example: "Teste",
            },
            description: {
              type: "string",
              example: "Teste",
            },
            category: {
              type: "string",
              example: "Teste",
            },
            imageUrl: {
              type: "string",
              example: "Teste",
            },
            createdBy: {
              type: "string",
              example: "Teste",
            },
          },
        },
        UpdateCourseRequest: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              example: "123456789012345678901234",
            },
            title: {
              type: "string",
              example: "Teste",
            },
            description: {
              type: "string",
              example: "Teste",
            },
            category: {
              type: "string",
              example: "Teste",
            },
            imageUrl: {
              type: "string",
              example: "Teste",
            },
          },
        },
      },
      responses: {
        BaseResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operação realizada com sucesso",
            },
            data: {
              nullable: true,
            },
          },
        },
        SuccessLogin: {
          description: "Operação realizada com sucesso",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/responses/BaseResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { nullable: true, example: null },
                      token: {
                        type: "string",
                        example: "lfjkdaflgjsa...",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },

      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  apis: [path.resolve(process.cwd(), "src/routes/*.js")],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

/* isso sem o components/schemas
  schema:
    type: object
    required:
      - username
      - password
    
    properties:
      username:
        type: string
      password:
        type: string
 */
