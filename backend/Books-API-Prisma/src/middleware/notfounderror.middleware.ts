export class NotFoundError extends Error {
    status: number;
    constructor(message: string = "Resource not found") {
        super(message);
        this.status = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}