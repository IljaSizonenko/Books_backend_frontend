import { books } from "../data/mock/Books.mock.faker.js";
import { Book } from "../models/book.model.js";
import { sortByField } from "../utils/sort.utils.js";

export interface BookQuery {
    title?: string;
    publishedYear?: number;
    language?: string;
    authorId?: number;
    genreId?: number;
    sort?: "title" | "publishedYear";
    order?: "asc" | "desc";
    page?: number;
    limit?: number;
}

export class BookService {
    static getAll(query: BookQuery) {
        let result = [...books];
        if (query.title) {
            result = result.filter(b =>
                b.title.toLowerCase().includes(query.title!.toLowerCase())
            );
        }
        if (query.publishedYear) {
            result = result.filter(b => b.publishedYear === query.publishedYear);
        }
        if (query.language) {
            result = result.filter(b =>
                b.language.toLowerCase() === query.language!.toLowerCase()
            );
        }
        if (query.authorId) {
            result = result.filter(b => b.authorId === query.authorId);
        }
        if (query.genreId) {
            result = result.filter(b => b.genreIds.includes(query.genreId!));
        }
        if (query.sort) {
            result = sortByField(result, query.sort, query.order ?? "asc");
        }
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const start = (page - 1) * limit;
        const paginated = result.slice(start, start + limit);
        return {
            page,
            limit,
            total: result.length,
            data: paginated
        };
    }
    static getById(id: number): Book {
        const book = books.find(b => b.id === id);
        if (!book) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
        return book;
    }
    static create(data: Omit<Book, "id" | "createdAt" | "updatedAt">): Book {
        const newBook: Book = {
            ...data,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        books.push(newBook);
        return newBook;
    }
    static update(id: number, data: Partial<Omit<Book, "id">>): Book {
        const book = this.getById(id);
        const updated: Book = {
            ...book,
            ...data,
            updatedAt: new Date().toISOString()
        };
        const index = books.findIndex(b => b.id === id);
        books[index] = updated;

        return updated;
    }
    static delete(id: number): void {
        const index = books.findIndex(b => b.id === id);
        if (index === -1) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
        books.splice(index, 1);
    }
}