export function paginate(items, page, limit) {
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const start = (currentPage - 1) * limit;
    const data = items.slice(start, start + limit);
    return {
        data,
        pagination: {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage: limit,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1
        }
    };
}
//# sourceMappingURL=pagination.utils.js.map