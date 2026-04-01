import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/Review.service.js";
import { parseId } from "../utils/parseId.utils.js";

export class ReviewController {
    static create(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const review = ReviewService.create(bookId, req.body);
            res.status(201).json(review);
        } catch (err) {
            next(err);
        }
    }
    static getByBook(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const reviews = ReviewService.getByBook(bookId);
            res.json(reviews);
        } catch (err) {
            next(err);
        }
    }
    static getAverageRating(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const rating = ReviewService.getAverageRating(bookId);
            res.json({ averageRating: rating });
        } catch (err) {
            next(err);
        }
    }
}