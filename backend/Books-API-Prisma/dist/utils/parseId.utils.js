"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseId = parseId;
function parseId(param) {
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
