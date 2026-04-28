import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export function validate<T>(schema: ZodType<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return next({
                status: 400,
                message: "Validation failed",
                details: result.error.issues.map(e => ({
                    field: e.path.length ? e.path.join(".") : null,
                    message: e.message
                }))
            });
        }
        req.body = result.data;
        next();
    };
}