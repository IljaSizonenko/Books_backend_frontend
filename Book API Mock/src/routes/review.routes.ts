import { Router } from "express";
import { ReviewController } from "../controllers/review.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { reviewCreateSchema } from "../validators/review.validators.js";

const router = Router();
/**
 * @openapi
 * /api/v1/books/{bookId}/reviews:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found
 */
router.get("/:bookId/reviews", ReviewController.getByBook);
/**
 * @openapi
 * /api/v1/books/{bookId}/reviews:
 *   post:
 *     summary: Create a review for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreate'
 *     responses:
 *       201:
 *         description: Review created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error or Bad request (invalid JSON or invalid fields)
 *       404:
 *         description: Book not found
 */
router.post("/:bookId/reviews", validate(reviewCreateSchema), ReviewController.create);
/**
 * @openapi
 * /api/v1/books/{bookId}/average-rating:
 *   get:
 *     summary: Get average rating for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Average rating value
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       404:
 *         description: Book not found
 */
router.get("/:bookId/average-rating", ReviewController.getAverageRating);
export default router