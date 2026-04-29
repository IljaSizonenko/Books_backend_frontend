"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaContains = prismaContains;
exports.prismaEquals = prismaEquals;
function prismaContains(search) {
    if (!search)
        return undefined;
    return {
        contains: search,
        mode: "insensitive"
    };
}
function prismaEquals(search) {
    if (search === undefined || search === null)
        return undefined;
    return search;
}
