export function getPagination<T>(page?: string, limit?: string) {
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 10);
    return {
        page: pageNum,
        limit: limitNum,
        skip: (pageNum - 1) * limitNum,
        take: limitNum
    };
}
export function buildPaginationMeta(totalItems: number, page: number, limit: number) {
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    return {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
    };
}