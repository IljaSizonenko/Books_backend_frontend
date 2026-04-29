"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const review_validators_1 = require("../validators/review.validators");
const router = (0, express_1.Router)({ mergeParams: true });
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
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Book not found
 */
router.get("/", review_controller_1.ReviewController.getReviewsByBookId);
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreateDto'
 *     responses:
 *       201:
 *         description: Review created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Book not found
 *       500:
 *         description: Invalid JSON or server error
 */
router.post("/", (0, validate_middleware_1.validate)(review_validators_1.reviewCreateSchema), review_controller_1.ReviewController.createReview);
/**
 * @openapi
 * /api/v1/books/{bookId}/reviews/average:
 *   get:
 *     summary: Get average rating for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Average rating calculated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Book not found
 */
router.get("/average", review_controller_1.ReviewController.getAverageRating);
exports.default = router;
