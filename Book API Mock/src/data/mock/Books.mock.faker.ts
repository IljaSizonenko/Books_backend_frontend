import { faker } from '@faker-js/faker'; 
import { Book } from "../../models/book.model.js"; 
 
/** 
 * Generates a single fake book using faker. 
 * 
 * @Bparam id Unique identifier for the book. 
 * @returns A fake `Book` instance. 
 */ 
function generateBook(id: number): Book { 
  return { 
    id, 
    title: faker.book.title(),
    isbn: faker.string.alphanumeric(13),
    publishedYear: faker.date.past({ years: 50 }).getFullYear(),
    pageCount: faker.number.int({min: 50, max: 1000}),
    language: faker.helpers.arrayElement(["en", "et", "fr", "de"]),
    description: faker.lorem.paragraph(),
    coverImage: faker.image.url({
      width: 400,
      height: 500
    }),
    authorId: faker.number.int({min: 1, max: 20}), 
    publisherId: faker.number.int({min: 1, max: 20}),
    genreIds: faker.helpers.arrayElements(
      Array.from({ length: 10 }, (_, i) => i + 1),
      faker.number.int({min: 1, max: 3})
    ),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString()
  }; 
}
 
/** 
 * Generates an array of fake books. 
 * 
 * @param count Number of books to generate. 
 * @returns Array of fake `Book` instances. 
 */ 
function generateBooks(count: number): Book[] { 
  return Array.from({ length: count }, (_, index) => generateBook(index + 1)); 
} 
 
/** 
 * Generates a seeded array of fake books. 
 * Useful for tests where data must be stable. 
 * 
 * @param count Number of books to generate. 
 * @param seed Seed value for faker (default 42). 
 * @returns Array of fake `Book` instances generated with a fixed seed. 
 */ 
function generateSeededBooks(count: number, seed: number = 42): Book[] { 
  faker.seed(seed);  
  const books = Array.from({ length: count }, (_, index) => generateBook(index + 1)); 
  faker.seed();  
  return books; 
} 
export let books: Book[] = generateBooks(20); 
export let fakeBooks: Book[] = generateSeededBooks(20)