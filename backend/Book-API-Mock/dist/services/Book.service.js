import { books } from "../data/mock/Books.mock.faker.js";
import { sortByField } from "../utils/sort.utils.js";
import { NotFoundError } from "../middleware/notfounderror.middleware.js";
export class BookService {
    static findBookOrThrow(id) {
        const book = books.find(b => b.id === id);
        if (!book) {
            throw new NotFoundError("Book not found");
        }
        return book;
    }
    static getAll(query) {
        let result = [...books];
        if (query.title) {
            result = result.filter(b => b.title.toLowerCase().includes(query.title.toLowerCase()));
        }
        if (query.publishedYear) {
            result = result.filter(b => b.publishedYear === query.publishedYear);
        }
        if (query.language) {
            result = result.filter(b => b.language.toLowerCase() === query.language.toLowerCase());
        }
        if (query.authorId) {
            result = result.filter(b => b.authorId === query.authorId);
        }
        if (query.genreId) {
            result = result.filter(b => b.genreIds.includes(query.genreId));
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
    static getById(id) {
        return this.findBookOrThrow(id);
    }
    static create(data) {
        const newBook = {
            ...data,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        books.push(newBook);
        return newBook;
    }
    static update(id, data) {
        const book = this.findBookOrThrow(id);
        const updated = {
            ...book,
            ...data,
            updatedAt: new Date().toISOString()
        };
        const index = books.findIndex(b => b.id === id);
        books[index] = updated;
        return updated;
    }
    static delete(id) {
        this.findBookOrThrow(id);
        const index = books.findIndex(b => b.id === id);
        books.splice(index, 1);
    }
}
//# sourceMappingURL=Book.service.js.map