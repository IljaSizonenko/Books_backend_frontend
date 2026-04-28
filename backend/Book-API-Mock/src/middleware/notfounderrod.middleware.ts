import { ErrorDetail } from "../types/error-detail.js";

export class NotFoundError extends Error {
    status: number;
    details?: ErrorDetail[]
    constructor(message: string, details?: ErrorDetail[]) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
        this.details = details ?? [];
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
    }
}