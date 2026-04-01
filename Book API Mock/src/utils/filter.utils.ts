export function contains(value: string, search?: string) {
    if (!value) return false
    return !search || value.toLowerCase().includes(search.toLowerCase());
}
export function equals<T>(value: T, search?: T) {
    return search === undefined || value === search;
}