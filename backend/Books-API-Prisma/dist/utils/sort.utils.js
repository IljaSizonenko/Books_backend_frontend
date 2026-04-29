"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortOptions = getSortOptions;
function getSortOptions(sortBy, order) {
    if (!sortBy)
        return undefined;
    const direction = order === "desc" ? "desc" : "asc";
    return {
        [sortBy]: direction
    };
}
