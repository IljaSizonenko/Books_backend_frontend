import { faker } from "@faker-js/faker";
import { Publisher } from "../../models/publisher.model.js";

function generatePublisher(id: number): Publisher {
   return {
    id,
    name: faker.company.name(),
    country: faker.location.country(),
    foundedYear: faker.number.int({min: 1900, max: 2026}),
    website: faker.internet.url(),
    createdAt: faker.date.past().toISOString()
   };
}
export function generatePublishers(count: number): Publisher[] {
    return Array.from({length: count}, (_, i) => generatePublisher(i + 1));
}
export function generateSeededPublishers(count: number, seed: number = 42): Publisher[] {
    faker.seed(seed);
    const publishers = generatePublishers(count);
    faker.seed();
    return publishers;
}
export const publishers: Publisher[] = generatePublishers(10);
export const fakePublishers: Publisher[] = generateSeededPublishers(10)