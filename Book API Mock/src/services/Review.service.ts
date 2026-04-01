import { reviews } from "../data/mock/Reviews.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Review } from "../models/review.model.js";

export class ReviewService {
    private static findBookOrThrow(bookId: number) {
        const book = books.find(b => b.id === bookId);
        if (!book) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
    }
    static getByBook(bookId: number): Review[] {
        this.findBookOrThrow(bookId);
        return reviews.filter(r => r.bookId === bookId);
    }
    static create(
        bookId: number,
        data: Omit<Review, "id" | "bookId" | "createdAt">
    ): Review {
        this.findBookOrThrow(bookId);
        const newReview: Review = {
            id: Date.now(),
            bookId,
            userName: data.userName,
            rating: data.rating,
            comment: data.comment,
            createdAt: new Date().toISOString()
        };
        reviews.push(newReview);
        return newReview;
    }
    static getAverageRating(bookId: number): number {
        this.findBookOrThrow(bookId);
        const bookReviews = reviews.filter(r => r.bookId === bookId);
        if (bookReviews.length === 0) {
            return 0;
        }
        const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0);
        return parseFloat((sum / bookReviews.length).toFixed(2));
    }
}