import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export function validate<T>(schema: ZodType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    details: err.issues.map(issue => ({
                        field: issue.path.join("."),
                        message: issue.message
                    })),
                });
            }
            next(err);
        }
    };
}