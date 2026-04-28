export function contains(value, search) {
    if (!value)
        return false;
    return !search || value.toLowerCase().includes(search.toLowerCase());
}
export function equals(value, search) {
    return search === undefined || value === search;
}
//# sourceMappingURL=filter.utils.js.map