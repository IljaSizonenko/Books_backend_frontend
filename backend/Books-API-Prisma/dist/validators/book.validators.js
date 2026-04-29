"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookUpdateSchema = exports.bookQuerySchema = exports.bookCreateSchema = void 0;
const zod_1 = require("zod");
exports.bookCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    isbn: zod_1.z.string().min(8, "ISBN must be at least 8 characters"),
    publishedYear: zod_1.z.coerce.number().int().min(0, "Invalid year"),
    pageCount: zod_1.z.coerce.number().int().min(1, "Page count must be positive"),
    language: zod_1.z.string().min(1, "Language is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    coverImage: zod_1.z.string().url("Cover image must be a valid URL").optional(),
    authorId: zod_1.z.coerce.number().int("Author ID must be a number"),
    publisherId: zod_1.z.coerce.number().int("Publisher ID must be a number"),
    genreIds: zod_1.z.array(zod_1.z.coerce.number().int()).min(1, "At least one genre is required"),
});
exports.bookQuerySchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    publisher: zod_1.z.string().optional(),
    year: zod_1.z.string().optional(),
    sortBy: zod_1.z.string().optional(),
    order: zod_1.z.enum(["asc", "desc"]).optional(),
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
});
exports.bookUpdateSchema = exports.bookCreateSchema.partial();
