export function parseId(param) {
    if (!param.trim()) {
        throw {
            status: 400,
            message: "Invalid ID",
            details: ["ID cannot be empty"]
        };
    }
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
//# sourceMappingURL=parseId.utils.js.map