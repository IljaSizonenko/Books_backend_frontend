"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
function success(data, meta = null) {
    return {
        success: true,
        data,
        meta,
    };
}
