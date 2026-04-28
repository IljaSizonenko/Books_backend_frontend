import { faker } from "@faker-js/faker";
function generateReview(id, maxBookId) {
    return {
        id,
        bookId: faker.number.int({ min: 1, max: maxBookId }),
        userName: faker.person.fullName(),
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentences({ min: 1, max: 3 }),
        createdAt: faker.date.past().toISOString()
    };
}
export function generateReviews(count, maxBookId) {
    return Array.from({ length: count }, (_, i) => generateReview(i + 1, maxBookId));
}
export function generateSeededReviews(count, maxBookId, seed = 42) {
    faker.seed(seed);
    const reviews = generateReviews(count, maxBookId);
    faker.seed();
    return reviews;
}
const MaxBookId = 30;
export const reviews = generateReviews(50, MaxBookId);
export const fakeReviews = generateSeededReviews(50, MaxBookId);
//# sourceMappingURL=Reviews.mock.faker.js.map