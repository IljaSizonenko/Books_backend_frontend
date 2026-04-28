import { BookService } from "../services/Book.service.js";
import { parseId } from "../utils/parseId.utils.js";
export class BookController {
    static getAll(req, res, next) {
        try {
            const filters = {
                title: req.query.title,
                language: req.query.language,
                publishedYear: req.query.publishedYear ? Number(req.query.publishedYear) : undefined,
                authorId: req.query.authorId ? Number(req.query.authorId) : undefined,
                genreId: req.query.genreId ? Number(req.query.genreId) : undefined,
                sort: req.query.sort,
                order: req.query.order,
                page: req.query.page ? Number(req.query.page) : 1,
                limit: req.query.limit ? Number(req.query.limit) : 10
            };
            const result = BookService.getAll(filters);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static getById(req, res, next) {
        try {
            const id = parseId(String(req.params.id));
            const book = BookService.getById(id);
            res.json(book);
        }
        catch (err) {
            next(err);
        }
    }
    static create(req, res, next) {
        try {
            const book = BookService.create(req.body);
            res.status(201).json(book);
        }
        catch (err) {
            next(err);
        }
    }
    static update(req, res, next) {
        try {
            const id = parseId(String(req.params.id));
            const updated = BookService.update(id, req.body);
            res.json(updated);
        }
        catch (err) {
            next(err);
        }
    }
    static delete(req, res, next) {
        try {
            const id = parseId(String(req.params.id));
            BookService.delete(id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
//# sourceMappingURL=book.controller.js.map