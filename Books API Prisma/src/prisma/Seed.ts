import { PrismaClient } from "../src/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 
import 'dotenv/config';
 
const prisma = new PrismaClient({ 
  adapter: new PrismaPg({ 
    connectionString: process.env.DATABASE_URL as string, 
  }), 
}); 

async function main() { 
  console.log("Seeding database..."); 
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.genre.deleteMany();
  const authors = await prisma.$transaction([
    prisma.author.create({
      data: {
        firstName: "Robert",
        lastName: "Martin",
        birthYear: 1952,
        nationality: "American",
        biography: "Author of Clean Code and Clean Architecture.",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "Martin",
        lastName: "Fowler",
        birthYear: 1963,
        nationality: "British",
        biography: "Known for Refactoring and enterprise architecture.",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "Erich",
        lastName: "Gamma",
        birthYear: 1961,
        nationality: "Swiss",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "Richard",
        lastName: "Helm",
        birthYear: 1960,
        nationality: "Australian",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "Ralph",
        lastName: "Johnson",
        birthYear: 1955,
        nationality: "American",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "John",
        lastName: "Vlissides",
        birthYear: 1961,
        nationality: "American",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "Kent",
        lastName: "Beck",
        birthYear: 1961,
        nationality: "American",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "Joshua",
        lastName: "Bloch",
        birthYear: 1961,
        nationality: "American",
      },
    }),
  ]);
  const [ 
    robertMartin, 
    martinFowler, 
    erichGamma, 
    richardHelm, 
    ralphJohnson, 
    johnVlissides, 
    kentBeck, 
    joshuaBloch, 
  ] = authors; 

  const publishers = await prisma.$transaction([
    prisma.publisher.create({
      data: {
        name: "Prentice Hall",
        country: "USA",
        foundedYear: 1913,
        website: "https://www.pearson.com",
      },
    }),
    prisma.publisher.create({
      data: {
        name: "Addison-Wesley",
        country: "USA",
        foundedYear: 1942,
        website: "https://www.awl.com",
      },
    }),
  ]);
  const [prenticeHall, addisonWesley] = publishers;

  const genres = await prisma.$transaction([
    prisma.genre.create({ data: { name: "Programming" } }),
    prisma.genre.create({ data: { name: "Software Engineering" } }),
    prisma.genre.create({ data: { name: "Architecture" } }),
    prisma.genre.create({ data: { name: "Design Patterns" } }),
    prisma.genre.create({ data: { name: "Testing" } }),
  ]);
  const [programming, engineering, architecture, patterns, testing] = genres;

  const books = await prisma.$transaction([
    prisma.book.create({
      data: {
        title: "Clean Code",
        isbn: "9780132350884",
        publishedYear: 2008,
        pageCount: 464,
        language: "English",
        description: "A handbook of agile software craftsmanship.",
        authorId: robertMartin.id,
        publisherId: prenticeHall.id,
        genres: { connect: [{ id: programming.id }, { id: engineering.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "The Pragmatic Programmer",
        isbn: "9780201616224",
        publishedYear: 1999,
        pageCount: 352,
        language: "English",
        description: "Classic book on pragmatic software development.",
        authorId: martinFowler.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: programming.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "Refactoring",
        isbn: "9780201485677",
        publishedYear: 1999,
        pageCount: 448,
        language: "English",
        description: "Improving the design of existing code.",
        authorId: martinFowler.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: engineering.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "Clean Architecture",
        isbn: "9780134494166",
        publishedYear: 2017,
        pageCount: 432,
        language: "English",
        description: "A guide to software structure and design.",
        authorId: robertMartin.id,
        publisherId: prenticeHall.id,
        genres: { connect: [{ id: architecture.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "Design Patterns",
        isbn: "9780201633610",
        publishedYear: 1994,
        pageCount: 395,
        language: "English",
        description: "Elements of reusable object-oriented software.",
        authorId: erichGamma.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: patterns.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "Web-Programming",
        isbn: "97802016376",
        publishedYear: 2023,
        pageCount: 342,
        language: "Estonian",
        description: "Basics of web-development",
        authorId: richardHelm.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: patterns.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "Network application",
        isbn: "2345234555",
        publishedYear: 2024,
        pageCount: 464,
        language: "Estonian",
        description: "How works a network",
        authorId: ralphJohnson.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: patterns.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "Data analysis",
        isbn: "5347856657",
        publishedYear: 2019,
        pageCount: 231,
        language: "French",
        description: "basics of data analysis",
        authorId: johnVlissides.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: patterns.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "PLC programming",
        isbn: "2375975823",
        publishedYear: 2022,
        pageCount: 191,
        language: "English",
        description: "Siemens PLC programming",
        authorId: kentBeck.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: patterns.id }] },
      },
    }),
    prisma.book.create({
      data: {
        title: "Systems of database",
        isbn: "4985276759",
        publishedYear: 2021,
        pageCount: 431,
        language: "French",
        description: "SQL programming",
        authorId: joshuaBloch.id,
        publisherId: addisonWesley.id,
        genres: { connect: [{ id: patterns.id }] },
      },
    }),
  ]);
  const [
    cleanCode, 
    pragmatic, 
    refactoring, 
    cleanArch, 
    designPatternsBook] =
    books;
  await prisma.review.createMany({
    data: [
      {
        bookId: cleanCode.id,
        userName: "Alice",
        rating: 5,
        comment: "Must-read for every developer.",
      },
      {
        bookId: pragmatic.id,
        userName: "Bob",
        rating: 4,
        comment: "Great book, but dense in places.",
      },
      {
        bookId: refactoring.id,
        userName: "Charlie",
        rating: 5,
        comment: "Classic. Still relevant today.",
      },
      {
        bookId: cleanArch.id,
        userName: "John",
        rating: 3,
        comment: "Very difficult for beginners",
      },
      {
        bookId: designPatternsBook.id,
        userName: "Stella",
        rating: 4,
        comment: "Great book, but there are some inconsistencies",
      },
    ],
  });
console.log("Seed done!"); 
} 
main() 
  .catch((error) => { 
    console.error("Error:", error); 
    process.exit(1); 
  }) 
  .finally(async () => { 
  await prisma.$disconnect(); 
}); 