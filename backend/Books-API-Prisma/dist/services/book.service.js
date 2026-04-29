"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const notfounderror_middleware_1 = require("../middleware/notfounderror.middleware");
const filter_utils_1 = require("../utils/filter.utils");
const pagination_utils_1 = require("../utils/pagination.utils");
const sort_utils_1 = require("../utils/sort.utils");
class BookService {
    static async findBookOrThrow(id) {
        const book = await prismaClient_1.prisma.book.findUnique({
            where: { id },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true,
            },
        });
        if (!book) {
            throw new notfounderror_middleware_1.NotFoundError("Book not found");
        }
        return book;
    }
    static async getAllBooks(query) {
        const { page, limit, skip, take } = (0, pagination_utils_1.getPagination)(query.page, query.limit);
        const where = {};
        if (query.title) {
            where.title = (0, filter_utils_1.prismaContains)(query.title);
        }
        if (query.language) {
            where.language = (0, filter_utils_1.prismaEquals)(query.language);
        }
        if (query.year) {
            const year = Number(query.year);
            if (!isNaN(year)) {
                where.publishedYear = (0, filter_utils_1.prismaEquals)(year);
            }
        }
        if (query.author) {
            where.author = {
                OR: [
                    { firstName: (0, filter_utils_1.prismaContains)(query.author) },
                    { lastName: (0, filter_utils_1.prismaContains)(query.author) }
                ]
            };
        }
        if (query.genre) {
            where.genres = { some: { name: (0, filter_utils_1.prismaContains)(query.genre) } };
        }
        if (query.publisher) {
            where.publisher = { name: (0, filter_utils_1.prismaContains)(query.publisher) };
        }
        const orderBy = (0, sort_utils_1.getSortOptions)(query.sortBy, query.order);
        const [totalItems, books] = await Promise.all([
            prismaClient_1.prisma.book.count({ where }),
            prismaClient_1.prisma.book.findMany({
                where,
                include: {
                    author: true,
                    publisher: true,
                    genres: true,
                    reviews: true,
                },
                orderBy,
                skip,
                take
            })
        ]);
        return {
            data: books,
            pagination: (0, pagination_utils_1.buildPaginationMeta)(totalItems, page, limit)
        };
    }
    static async getBookById(id) {
        return this.findBookOrThrow(id);
    }
    static async createBook(data) {
        return prismaClient_1.prisma.$transaction(async (tx) => {
            await tx.author.findUniqueOrThrow({ where: { id: data.authorId } });
            await tx.publisher.findUniqueOrThrow({ where: { id: data.publisherId } });
            for (const gid of data.genreIds) {
                await tx.genre.findUniqueOrThrow({ where: { id: gid } });
            }
            return tx.book.create({
                data: {
                    title: data.title,
                    isbn: data.isbn,
                    publishedYear: data.publishedYear,
                    pageCount: data.pageCount,
                    language: data.language,
                    description: data.description,
                    author: { connect: { id: data.authorId } },
                    publisher: { connect: { id: data.publisherId } },
                    genres: {
                        connect: data.genreIds.map((id) => ({ id })),
                    },
                },
                include: {
                    author: true,
                    publisher: true,
                    genres: true,
                    reviews: true,
                },
            });
        });
    }
    static async updateBook(id, data) {
        return prismaClient_1.prisma.$transaction(async (tx) => {
            await tx.book.findUniqueOrThrow({ where: { id } });
            if (data.authorId !== undefined) {
                await tx.author.findUniqueOrThrow({ where: { id: data.authorId } });
            }
            if (data.publisherId !== undefined) {
                await tx.publisher.findUniqueOrThrow({ where: { id: data.publisherId } });
            }
            if (data.genreIds !== undefined) {
                for (const gid of data.genreIds) {
                    await tx.genre.findUniqueOrThrow({ where: { id: gid } });
                }
            }
            const { genreIds, ...rest } = data;
            return tx.book.update({
                where: { id },
                data: {
                    ...rest,
                    genres: genreIds
                        ? { set: genreIds.map((gid) => ({ id: gid })) }
                        : undefined,
                },
                include: {
                    author: true,
                    publisher: true,
                    genres: true,
                    reviews: true,
                },
            });
        });
    }
    static async deleteBook(id) {
        return prismaClient_1.prisma.$transaction(async (tx) => {
            await tx.book.findUniqueOrThrow({ where: { id } });
            await tx.book.delete({ where: { id } });
        });
    }
}
exports.BookService = BookService;
