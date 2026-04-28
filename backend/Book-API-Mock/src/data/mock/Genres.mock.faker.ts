import { faker } from "@faker-js/faker";
import { Genre } from "../../models/genre.model.js";

function generateGenre(id: number): Genre {
    return {
        id,
        name: faker.commerce.department()
    };
}
export function generateGenres(count: number): Genre[] {
    return Array.from({length: count}, (_, i) => generateGenre(i + 1));
}
export function generateSeededGenres(count: number, seed: number = 42): Genre[] {
    faker.seed(seed);
    const genres = generateGenres(count);
    faker.seed();
    return genres;
}
export const genres: Genre[] = generateGenres(10);
export const fakeGenres: Genre[] = generateSeededGenres(10)