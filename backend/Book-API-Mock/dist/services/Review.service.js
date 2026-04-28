import { reviews } from "../data/mock/Reviews.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
export class ReviewService {
    static findBookOrThrow(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
    }
    static getByBook(bookId) {
        this.findBookOrThrow(bookId);
        return reviews.filter(r => r.bookId === bookId);
    }
    static create(bookId, data) {
        this.findBookOrThrow(bookId);
        const newReview = {
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
    static getAverageRating(bookId) {
        this.findBookOrThrow(bookId);
        const bookReviews = reviews.filter(r => r.bookId === bookId);
        if (bookReviews.length === 0) {
            return 0;
        }
        const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0);
        return parseFloat((sum / bookReviews.length).toFixed(2));
    }
}
//# sourceMappingURL=Review.service.js.map