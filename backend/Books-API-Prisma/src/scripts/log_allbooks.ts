import { prisma } from "../prisma/prismaClient";

function logBooks(title: string, books: any[]): void {
  console.log("\n" + "=".repeat(60));
  console.log(title);
  console.log("=".repeat(60));
  console.table(
    books.map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author?.name,
      publisher: b.publisher?.name,
      genres: b.genres.map((g: any) => g.name).join(", "),
      reviews: b.reviews.length,
    }))
  );
  console.log(`Total: ${books.length} books\n`);
}
async function main(): Promise<void> {
  const books = await prisma.book.findMany({
    include: {
      author: true,
      publisher: true,
      genres: true,
      reviews: true,
    },
  });
  logBooks("Books from PostgreSQL (Prisma)", books);
}
main()
  .catch((err) => {
    console.error("Failed to load books:", err);
    process.exit(1);
})
  .finally(async () => {
    await prisma.$disconnect();
});