export function sortByField<T>(
    items: T[],
    field: keyof T,
    order: "asc" | "desc" = "asc"
) {
    return [...items].sort((a, b) => {
        const x = a[field];
        const y = b[field];
        if (x < y) return order === "asc" ? -1 : 1;
        if (x > y) return order === "asc" ? 1 : -1;
        return 0;
    });
}