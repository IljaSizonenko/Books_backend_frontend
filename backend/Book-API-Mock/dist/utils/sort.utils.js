export function sortByField(items, field, order = "asc") {
    return [...items].sort((a, b) => {
        const x = a[field];
        const y = b[field];
        if (x < y)
            return order === "asc" ? -1 : 1;
        if (x > y)
            return order === "asc" ? 1 : -1;
        return 0;
    });
}
//# sourceMappingURL=sort.utils.js.map