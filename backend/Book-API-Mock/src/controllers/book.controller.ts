import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/Book.service.js";
import { parseId } from "../utils/parseId.utils.js";

export class BookController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = {
                title: req.query.title as string | undefined,
                language: req.query.language as string | undefined,
                publishedYear: req.query.publishedYear ? Number(req.query.publishedYear) : undefined,
                authorId: req.query.authorId ? Number(req.query.authorId) : undefined,
                genreId: req.query.genreId ? Number(req.query.genreId) : undefined,
                sort: req.query.sort as "title" | "publishedYear" | undefined,
                order: req.query.order as "asc" | "desc" | undefined,
                page: req.query.page ? Number(req.query.page) : 1,
                limit: req.query.limit ? Number(req.query.limit) : 10
            };
            const result = BookService.getAll(filters);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const book = BookService.getById(id);
            res.json(book);
        } catch (err) {
            next(err);
        }
    }
    static create(req: Request, res: Response, next: NextFunction) {
        try {
            const book = BookService.create(req.body);
            res.status(201).json(book);
        } catch (err) {
            next(err);
        }
    }
    static update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const updated = BookService.update(id, req.body);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }
    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            BookService.delete(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}