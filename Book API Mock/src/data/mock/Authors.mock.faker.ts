import { faker } from "@faker-js/faker";
import { Author } from "../../models/author.model.js";

function generateAuthor(id: number): Author {
    return {
        id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthYear: faker.date.past({years: 85}).getFullYear(),
        nationality: faker.location.country(),
        biography: faker.lorem.paragraph(),
        createdAt: faker.date.past().toISOString()
    };
}
export function generateAuthors(count: number): Author[] {
    return Array.from({length: count}, (_, i) => generateAuthor(i + 1));
}
export function generateSeededAuthors(count: number, seed: number = 42): Author[] {
    faker.seed(seed);
    const authors = generateAuthors(count);
    faker.seed();
    return authors
}
export const authors: Author[] = generateAuthors(20);
export const fakeAuthors: Author[] = generateSeededAuthors(20)