import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";
import { parseId } from "../utils/parseId.utils";
import { success } from "../utils/response.utils";
import { bookCreateSchema, bookUpdateSchema, bookQuerySchema } from "../validators/book.validators";
export class BookController {
    static async getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const query = bookQuerySchema.parse(req.query);
            const result = await BookService.getAllBooks(query);
            res.json(success(result.data, result.pagination));
        } catch (error) {
            next(error);
        }
    }
    static async getBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const book = await BookService.getBookById(id);
            res.json(success(book));
        } catch (error) {
            next(error);
        }
    }
    static async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const body = bookCreateSchema.parse(req.body);
            const book = await BookService.createBook(body);
            res.status(201).json(success(book));
        } catch (error) {
            next(error);
        }
    }
    static async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const body = bookUpdateSchema.parse(req.body);
            const updated = await BookService.updateBook(id, body);
            res.json(success(updated));
        } catch (error) {
            next(error);
        }
    }
    static async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            await BookService.deleteBook(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}