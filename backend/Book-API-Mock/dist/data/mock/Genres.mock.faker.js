import { faker } from "@faker-js/faker";
function generateGenre(id) {
    return {
        id,
        name: faker.commerce.department()
    };
}
export function generateGenres(count) {
    return Array.from({ length: count }, (_, i) => generateGenre(i + 1));
}
export function generateSeededGenres(count, seed = 42) {
    faker.seed(seed);
    const genres = generateGenres(count);
    faker.seed();
    return genres;
}
export const genres = generateGenres(10);
export const fakeGenres = generateSeededGenres(10);
//# sourceMappingURL=Genres.mock.faker.js.map