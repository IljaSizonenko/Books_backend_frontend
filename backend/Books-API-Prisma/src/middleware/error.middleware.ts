import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { NotFoundError } from "./notfounderror.middleware";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: err.issues,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      success: false,
      error: err.message,
    });
  }
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: err.meta?.cause || "Record not found",
      details: err.meta,
    });
  }
  if (err.code === "P2002") {
    return res.status(400).json({
      success: false,
      error: "Unique constraint failed",
      details: err.meta,
    });
  }
  if (err.code === "P2003") {
    return res.status(400).json({
      success: false,
      error: "Foreign key constraint failed",
      details: err.meta,
    });
  }
  if (err.code === "P2012" || err.code === "P2011") {
    return res.status(400).json({
      success: false,
      error: "Prisma validation error",
      details: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    error: "Internal server error",
    details: err.message || err,
  });
}