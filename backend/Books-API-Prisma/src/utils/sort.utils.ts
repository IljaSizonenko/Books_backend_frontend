export function getSortOptions(sortBy?: string, order?: string) {
    if (!sortBy) return undefined;
    const direction = order === "desc" ? "desc" : "asc";
    return {
        [sortBy]: direction
    };
}