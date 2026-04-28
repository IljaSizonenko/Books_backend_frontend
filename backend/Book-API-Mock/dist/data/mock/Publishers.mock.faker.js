import { faker } from "@faker-js/faker";
function generatePublisher(id) {
    return {
        id,
        name: faker.company.name(),
        country: faker.location.country(),
        foundedYear: faker.number.int({ min: 1900, max: 2026 }),
        website: faker.internet.url(),
        createdAt: faker.date.past().toISOString()
    };
}
export function generatePublishers(count) {
    return Array.from({ length: count }, (_, i) => generatePublisher(i + 1));
}
export function generateSeededPublishers(count, seed = 42) {
    faker.seed(seed);
    const publishers = generatePublishers(count);
    faker.seed();
    return publishers;
}
export const publishers = generatePublishers(10);
export const fakePublishers = generateSeededPublishers(10);
//# sourceMappingURL=Publishers.mock.faker.js.map