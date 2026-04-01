import { z } from "zod";
export const bookCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    isbn: z.string().min(8, "ISBN must be at least 8 characters"),
    publishedYear: z.coerce.number().int().min(0, "Invalid year"),
    pageCount: z.coerce.number().int().min(1, "Page count must be positive"),
    language: z.string().min(1, "Language is required"),
    description: z.string().min(1, "Description is required"),
    coverImage: z.string().url("Cover image must be a valid URL").optional(),
    authorId: z.coerce.number().int("Author ID must be a number"),
    publisherId: z.coerce.number().int("Publisher ID must be a number"),
    genreIds: z.array(z.coerce.number().int()).min(1, "At least one genre is required"),
});
export const bookQuerySchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    language: z.string().optional(),
    publisher: z.string().optional(),
    year: z.string().optional(),
    sortBy: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
});
export const bookUpdateSchema = bookCreateSchema.partial();