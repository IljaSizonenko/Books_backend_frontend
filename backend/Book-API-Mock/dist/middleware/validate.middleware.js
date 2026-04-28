export function validate(schema) {
    return (req, _res, next) => {
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
//# sourceMappingURL=validate.middleware.js.map