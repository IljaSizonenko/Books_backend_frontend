import { z } from "zod";
export const bookCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    isbn: z.string().min(8, "Isbn must be at least 8 characters"),
    publishedYear: z.number().int().min(0, "Invalid Year"),
    pageCount: z.number().int().min(1, "Page count must be positive"),
    language: z.string().min(1, "Language is required"),
    description: z.string().min(1, "Description is required"),
    coverImage: z.string().url("Cover image must be a valid URL").optional(),
    authorId: z.number().int("Author ID must be a number"),
    genreIds: z.array(z.number().int()).min(1, "At least one genre is required")
});
export const bookUpdateSchema = bookCreateSchema.partial()