import { z } from "zod"

export const reviewCreateSchema = z.object({
    userName: z.string().min(1, "User name is required"),
    rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    comment: z.string().min(1, "Comment is required")
});
export const reviewUpdateSchema = reviewCreateSchema.partial()