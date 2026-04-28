import { faker } from "@faker-js/faker";
import { Review } from "../../models/review.model.js";

function generateReview(id: number, maxBookId: number): Review {
    return {
        id,
        bookId: faker.number.int({min: 1, max: maxBookId}),
        userName: faker.person.fullName(),
        rating: faker.number.int({min: 1, max: 5}),
        comment: faker.lorem.sentences({min: 1, max: 3}),
        createdAt: faker.date.past().toISOString()
    };
}
export function generateReviews(count: number, maxBookId: number): Review[] {
    return Array.from({length: count}, (_, i) => generateReview(i + 1, maxBookId))
}
export function generateSeededReviews(
    count: number,
    maxBookId: number,
    seed: number = 42
): Review[] {
    faker.seed(seed);
    const reviews = generateReviews(count, maxBookId);
    faker.seed()
    return reviews;
}
const MaxBookId = 30;
export const reviews: Review[] = generateReviews(50, MaxBookId)
export const fakeReviews: Review[] = generateSeededReviews(50, MaxBookId) 