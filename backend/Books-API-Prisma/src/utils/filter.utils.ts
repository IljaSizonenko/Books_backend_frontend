export function prismaContains(search?: string) {
    if (!search) return undefined;
    return {
        contains: search,
        mode: "insensitive" as const
    };
}
export function prismaEquals<T>(search?: T) {
    if (search === undefined || search === null) return undefined;
    return search
}