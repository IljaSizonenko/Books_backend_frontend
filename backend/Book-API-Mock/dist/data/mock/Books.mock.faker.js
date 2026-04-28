import { faker } from '@faker-js/faker';
function generateBook(id) {
    return {
        id,
        title: faker.book.title(),
        isbn: faker.string.alphanumeric(13),
        publishedYear: faker.date.past({ years: 50 }).getFullYear(),
        pageCount: faker.number.int({ min: 50, max: 1000 }),
        language: faker.helpers.arrayElement(["en", "et", "fr", "de"]),
        description: faker.lorem.paragraph(),
        coverImage: faker.image.url({
            width: 400,
            height: 500
        }),
        authorId: faker.number.int({ min: 1, max: 20 }),
        publisherId: faker.number.int({ min: 1, max: 20 }),
        genreIds: faker.helpers.arrayElements(Array.from({ length: 10 }, (_, i) => i + 1), faker.number.int({ min: 1, max: 3 })),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString()
    };
}
function generateBooks(count) {
    return Array.from({ length: count }, (_, index) => generateBook(index + 1));
}
function generateSeededBooks(count, seed = 42) {
    faker.seed(seed);
    const books = Array.from({ length: count }, (_, index) => generateBook(index + 1));
    faker.seed();
    return books;
}
export let books = generateBooks(20);
export let fakeBooks = generateSeededBooks(20);
//# sourceMappingURL=Books.mock.faker.js.map