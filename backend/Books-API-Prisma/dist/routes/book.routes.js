"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const book_validators_1 = require("../validators/book.validators");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/v1/books:
 *   get:
 *     summary: Get all books with filtering, sorting and pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by book title (partial match)
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author full name (partial match)
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre name
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, publishedYear, language]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of books with pagination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/", book_controller_1.BookController.getAllBooks);
/**
 * @openapi
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Book not found
 */
router.get("/:id", book_controller_1.BookController.getBookById);
/**
 * @openapi
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookCreateDto'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation error (Zod or Prisma)
 *       404:
 *         description: Related entity not found (Author, Publisher, or Genre)
 *         content:
 *           application/json:
 *              example:
 *               success: false
 *               error: "Record not found"
 *               details:
 *                 cause "No Author found"
 */
router.post("/", (0, validate_middleware_1.validate)(book_validators_1.bookCreateSchema), book_controller_1.BookController.createBook);
/**
 * @openapi
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookUpdateDto'
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Book not found
 */
router.put("/:id", (0, validate_middleware_1.validate)(book_validators_1.bookUpdateSchema), book_controller_1.BookController.updateBook);
/**
 * @openapi
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Book not found
 */
router.delete("/:id", book_controller_1.BookController.deleteBook);
exports.default = router;
