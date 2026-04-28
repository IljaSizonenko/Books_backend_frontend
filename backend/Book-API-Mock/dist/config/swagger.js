import swaggerJsdoc from "swagger-jsdoc";
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book API Mock",
            version: "1.0.0",
            description: "API documentation for Book API with in-memory mock data",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            schemas: {
                Book: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        title: { type: "string" },
                        isbn: { type: "string" },
                        publishedYear: { type: "integer" },
                        pageCount: { type: "integer" },
                        language: { type: "string" },
                        description: { type: "string" },
                        coverImage: { type: "string", nullable: true },
                        authorId: { type: "integer" },
                        genreIds: {
                            type: "array",
                            items: { type: "integer" }
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                    }
                },
                BookCreate: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        isbn: { type: "string" },
                        publishedYear: { type: "integer" },
                        pageCount: { type: "integer" },
                        language: { type: "string" },
                        description: { type: "string" },
                        coverImage: { type: "string", nullable: true },
                        authorId: { type: "integer" },
                        genreIds: {
                            type: "array",
                            items: { type: "integer" }
                        }
                    },
                    required: [
                        "title",
                        "isbn",
                        "publishedYear",
                        "pageCount",
                        "language",
                        "description",
                        "authorId",
                        "genreIds"
                    ]
                },
                BookUpdate: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        isbn: { type: "string" },
                        publishedYear: { type: "integer" },
                        pageCount: { type: "integer" },
                        language: { type: "string" },
                        description: { type: "string" },
                        coverImage: { type: "string" },
                        authorId: { type: "integer" },
                        genreIds: {
                            type: "array",
                            items: { type: "integer" }
                        }
                    }
                },
                Review: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        bookId: { type: "integer" },
                        userName: { type: "string" },
                        rating: { type: "integer", minimum: 1, maximum: 5 },
                        comment: { type: "string" },
                        createdAt: { type: "string", format: "date-time" }
                    }
                },
                ReviewCreate: {
                    type: "object",
                    properties: {
                        userName: { type: "string" },
                        rating: { type: "integer", minimum: 1, maximum: 5 },
                        comment: { type: "string" }
                    },
                    required: ["userName", "rating"]
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        error: { type: "string" },
                        details: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    field: { type: "string" },
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
//# sourceMappingURL=swagger.js.map