export class NotFoundError extends Error {
    status;
    details;
    constructor(message, details) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
        this.details = details ?? [];
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
    }
}
//# sourceMappingURL=notfounderrod.middleware.js.map