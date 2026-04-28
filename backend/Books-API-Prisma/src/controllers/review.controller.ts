import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/review.service";
import { parseId } from "../utils/parseId.utils";
import { success } from "../utils/response.utils";
import { reviewCreateSchema } from "../validators/review.validators";

export class ReviewController {
    static async getReviewsByBookId(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const reviews = await ReviewService.getReviewByBookId(bookId);
            res.json(success(reviews));
        } catch (err) {
            next(err);
        }
    }
    static async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const body = reviewCreateSchema.parse(req.body);
            const review = await ReviewService.createReview({
                bookId,
                ...body,
            });
            res.status(201).json(success(review));
        } catch (err) {
            next(err);
        }
    }
    static async getAverageRating(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const result = await ReviewService.getAverageRating(bookId);
            res.json(success(result));
        } catch (err) {
            next(err);
        }
    }
}