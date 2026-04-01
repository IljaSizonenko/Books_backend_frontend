import { prisma } from "../prisma/prismaClient";
import { NotFoundError } from "../middleware/notfounderror.middleware";
import { prismaContains, prismaEquals } from "../utils/filter.utils";
import { getPagination, buildPaginationMeta } from "../utils/pagination.utils";
import { getSortOptions } from "../utils/sort.utils";

export class BookService {
    static async getAllBooks(query: any) {
    const { page, limit, skip, take } = getPagination(query.page, query.limit);
    const where: any = {};
    if (query.title) {
        where.title = prismaContains(query.title);
    }
    if (query.language) {
        where.language = prismaEquals(query.language);
    }
    if (query.year) {
        const year = Number(query.year);
        if (!isNaN(year)) {
            where.publishedYear = prismaEquals(year);
        }
    }
    if (query.author) {
        where.author = {
            OR: [
                { firstName: prismaContains(query.author) },
                { lastName: prismaContains(query.author) }
            ]
        };
    }
    if (query.genre) {
        where.genres = { some: { name: prismaContains(query.genre) } };
    }
    if (query.publisher) {
        where.publisher = { name: prismaContains(query.publisher) };
    }
    const orderBy = getSortOptions(query.sortBy, query.order);
    const [totalItems, books] = await Promise.all([
        prisma.book.count({ where }),
        prisma.book.findMany({
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
        pagination: buildPaginationMeta(totalItems, page, limit)
    };
}
    static async getBookById(id: number) {
        const book = await prisma.book.findUnique({
            where: { id },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true,
            },
        });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
        return book;
    }
    static async createBook(data: {
        title: string;
        isbn: string;
        publishedYear: number;
        pageCount: number;
        language: string;
        description: string;
        authorId: number;
        publisherId: number;
        genreIds: number[];
    }) {
        return prisma.$transaction(async (tx) => {
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
                    publisher: { connect: { id: data.publisherId}},
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
    static async updateBook(
        id: number,
        data: Partial<{
            title: string;
            isbn: string;
            publishedYear: number;
            pageCount: number;
            language: string;
            description: string;
            authorId: number;
            publisherId: number;
            genreIds: number[];
        }>
    ) {
        return prisma.$transaction(async (tx) => {
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
    static async deleteBook(id: number) {
        return prisma.$transaction(async (tx) => {
            await tx.book.findUniqueOrThrow({ where: { id } });
            await tx.book.delete({ where: { id } });
        });
    }
}