export function success(data: any, meta: any = null) {
    return {
        success: true,
        data,
        meta,
    };
}