export function parseId(param: string): number {
    const id = Number(param);
    if (!Number.isFinite(id)) {
        throw {
            status: 400,
            message: "Invalid ID",
            details: [`ID must be a number, received: ${param}`]
        };
    }
    return id;
}