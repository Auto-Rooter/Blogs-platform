import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Platform API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      responses: {
        Unauthorized: {
          description: "Missing or invalid auth token",
        },
        Forbidden: {
          description: "Not enough permissions to access",
        },
      },
      schemas: {
        UserSummary: {
          type: "object",
          properties: {
            _id:        { type: "string" },
            username:   { type: "string" },
            role:       { type: "string", enum: ["admin","author","user","pending"] },
            articlesCount: { type: "integer", description: "Number of articles" },
          },
        },
        User: {
          allOf: [
            { $ref: "#/components/schemas/UserSummary" },
            {
              type: "object",
              properties: {
                email:     { type: "string" },
                createdAt: { type: "string", format: "date-time" },
              },
            },
          ],
        },
        TopArticle: {
          type: "object",
          properties: {
            _id:   { type: "string" },
            title: { type: "string" },
            views: { type: "integer" },
          }
        },
        Summary: {
          type: "object",
          properties: {
            totalArticles:   { type: "integer" },
            totalViews:      { type: "integer" },
            averageViews:    { type: "number", format: "float" },
          }
        },
        CountryView: {
          type: "object",
          properties: {
            country: { type: "string", description: "Country code (e.g. US, ES, Unknown)" },
            count:   { type: "integer", description: "Number of views from this country" },
          }
        },
      },
    },
  },
  apis: [
    "./src/routes/*.ts",
  ],
};

export default swaggerOptions;