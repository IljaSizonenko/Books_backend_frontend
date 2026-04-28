import { faker } from "@faker-js/faker";
function generateAuthor(id) {
    return {
        id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthYear: faker.date.past({ years: 85 }).getFullYear(),
        nationality: faker.location.country(),
        biography: faker.lorem.paragraph(),
        createdAt: faker.date.past().toISOString()
    };
}
export function generateAuthors(count) {
    return Array.from({ length: count }, (_, i) => generateAuthor(i + 1));
}
export function generateSeededAuthors(count, seed = 42) {
    faker.seed(seed);
    const authors = generateAuthors(count);
    faker.seed();
    return authors;
}
export const authors = generateAuthors(20);
export const fakeAuthors = generateSeededAuthors(20);
//# sourceMappingURL=Authors.mock.faker.js.map