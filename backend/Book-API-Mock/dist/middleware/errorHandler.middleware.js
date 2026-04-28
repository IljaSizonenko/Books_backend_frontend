import { ZodError } from "zod";
export function errorHandler(err, _req, res, _next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Validation failed",
            details: err.issues.map(e => ({
                field: e.path.length ? e.path.join(".") : null,
                message: e.message
            }))
        });
    }
    if (typeof err === "object" &&
        err !== null &&
        "status" in err &&
        typeof err.status === "number") {
        const custom = err;
        return res.status(custom.status).json({
            error: custom.error || custom.message,
            details: custom.details || []
        });
    }
    if (err instanceof Error) {
        console.error("Unexpected error:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: []
        });
    }
    console.error("Unknown error:", err);
    return res.status(500).json({
        error: "Unknown error occurred",
        details: []
    });
}
//# sourceMappingURL=errorHandler.middleware.js.map