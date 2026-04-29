"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const notfounderror_middleware_1 = require("../middleware/notfounderror.middleware");
class ReviewService {
    static async ensureBookExists(bookId) {
        const book = await prismaClient_1.prisma.book.findUnique({ where: { id: bookId } });
        if (!book) {
            throw new notfounderror_middleware_1.NotFoundError("Book not found");
        }
    }
    static async getReviewByBookId(bookId, query) {
        await this.ensureBookExists(bookId);
        const where = {
            bookId,
            rating: query?.rating ? Number(query.rating) : undefined,
        };
        const allowedSortFields = ["createdAt", "rating", "userName"];
        let orderBy = { createdAt: "desc" };
        if (query?.sortBy && allowedSortFields.includes(query.sortBy)) {
            orderBy = {
                [query.sortBy]: query.order === "desc" ? "desc" : "asc",
            };
        }
        return prismaClient_1.prisma.review.findMany({
            where,
            orderBy,
            include: { book: true },
        });
    }
    static async createReview(data) {
        return prismaClient_1.prisma.$transaction(async (tx) => {
            await tx.book.findUniqueOrThrow({ where: { id: data.bookId } });
            if (data.rating < 1 || data.rating > 5) {
                throw new Error("Rating must be between 1 and 5");
            }
            return tx.review.create({
                data: {
                    rating: data.rating,
                    comment: data.comment,
                    userName: data.userName,
                    bookId: data.bookId,
                },
                include: { book: true },
            });
        });
    }
    static async getAverageRating(bookId) {
        await this.ensureBookExists(bookId);
        const result = await prismaClient_1.prisma.review.aggregate({
            where: { bookId },
            _avg: { rating: true },
        });
        return {
            bookId,
            averageRating: result._avg.rating ?? 0,
        };
    }
}
exports.ReviewService = ReviewService;
