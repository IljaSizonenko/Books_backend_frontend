"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewUpdateSchema = exports.reviewCreateSchema = void 0;
const zod_1 = require("zod");
exports.reviewCreateSchema = zod_1.z.object({
    userName: zod_1.z.string().min(1, "User name is required"),
    rating: zod_1.z.coerce.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    comment: zod_1.z.string().min(1, "Comment is required"),
});
exports.reviewUpdateSchema = exports.reviewCreateSchema.partial();
