import axios from "axios";
import type {
  PrismaBook,
  MockBook,
  UnifiedBook,
  BooksQueryParams,
  CreateBookPayload,
} from "./types.js";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Language adapter
const languageMap: Record<string, string> = {
  en: "English",
  et: "Estonian",
  fr: "French",
  de: "German",
};
const reverseLanguageMap: Record<string, string> = {
  English: "en",
  Estonian: "et",
  French: "fr",
  German: "de",
};
// Get all books
export const getBooks = async (
  params?: BooksQueryParams,
  signal?: AbortSignal
) => {
  const res = await api.get("/books", { params, signal });
  const raw = res.data;
  // Prisma format
  if (raw && typeof raw === "object" && "success" in raw) {
    const prismaItems = raw.data as PrismaBook[];
    const items: UnifiedBook[] = prismaItems.map((b) => ({
      ...b,
      language: reverseLanguageMap[b.language] ?? b.language,
    }));
    return {
      books: items,
      pagination: {
        page: raw.meta.currentPage,
        limit: raw.meta.itemsPerPage,
        total: raw.meta.totalItems,
      },
    };
  }
  // Mock format
  if (
    raw &&
    typeof raw === "object" &&
    "data" in raw &&
    "page" in raw &&
    "limit" in raw &&
    "total" in raw
  ) {
    let items: UnifiedBook[] = (raw.data as MockBook[]).map((b) => ({
      ...b,
      language: reverseLanguageMap[b.language] ?? b.language,
    }));
    if (params?.title) {
      const title = params.title.toLowerCase();
      items = items.filter((b) =>
        b.title.toLowerCase().includes(title)
      );
    }
    if (params?.year) {
      items = items.filter((b) => b.publishedYear === params.year);
    }
    if (params?.language) {
      items = items.filter((b) => b.language === params.language);
    }
    if (params?.sortBy) {
      const key = params.sortBy as keyof UnifiedBook;
      const order = params.order === "desc" ? -1 : 1;
      items = items.sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av == null || bv == null) return 0;
        if (av < bv) return -1 * order;
        if (av > bv) return 1 * order;
        return 0;
      });
    }
    return {
      books: items,
      pagination: {
        page: raw.page,
        limit: raw.limit,
        total: raw.total,
      },
    };
  }
  throw new Error("Unknown API response format");
};
// Get one book
export const getBook = async (id: string) => {
  const res = await api.get(`/books/${id}`);
  const raw = res.data;
  // Prisma format
  if (raw && typeof raw === "object" && "success" in raw) {
    const b = raw.data as PrismaBook;
    return {
      id: b.id,
      title: b.title,
      isbn: b.isbn,
      publishedYear: b.publishedYear,
      pageCount: b.pageCount,
      language: reverseLanguageMap[b.language] ?? b.language,
      description: b.description,
      coverImage: b.coverImage ?? null,
      authorName: b.author
        ? `${b.author.firstName} ${b.author.lastName}`
        : undefined,
      publisherName: b.publisher?.name,
      genres: b.genres?.map((g) => g.name) ?? [],
    };
  }
  // Mock format
  if (raw && raw.id) {
    return {
      id: raw.id,
      title: raw.title,
      isbn: raw.isbn,
      publishedYear: raw.publishedYear,
      pageCount: raw.pageCount,
      language: reverseLanguageMap[raw.language] ?? raw.language,
      description: raw.description,
      coverImage: raw.coverImage ?? null,
      authorName: raw.authorId ? `Author #${raw.authorId}` : undefined,
      publisherName: raw.publisherId ? `Publisher #${raw.publisherId}` : undefined,
      genres: raw.genreIds?.map((id: number) => `Genre #${id}`) ?? [],
    };
  }
  throw new Error("Unknown API response format");
};
// Create book
export const createBook = async (data: CreateBookPayload) => {
  const payload = {
    ...data,
    language: languageMap[data.language] ?? data.language,
    coverImage: data.coverImage || undefined,
  };
  const res = await api.post("/books", payload);
  const out = ("success" in res.data ? res.data.data : res.data) as UnifiedBook;
  return {
    ...out,
    language: reverseLanguageMap[out.language] ?? out.language,
  };
};
// Update book
export const updateBook = async (id: string, data: CreateBookPayload) => {
  const payload = {
    ...data,
    language: languageMap[data.language] ?? data.language,
    coverImage: data.coverImage || undefined,
  };
  const res = await api.put(`/books/${id}`, payload);
  const out = ("success" in res.data ? res.data.data : res.data) as UnifiedBook;
  return {
    ...out,
    language: reverseLanguageMap[out.language] ?? out.language,
  };
};
// Delete book
export const deleteBook = async (id: string) => {
  await api.delete(`/books/${id}`);
};
// Reviews
export const getReviews = async (id: string) => {
  const res = await api.get(`/books/${id}/reviews`);
  return "success" in res.data ? res.data.data : res.data;
};
export const getAverageRating = async (id: string) => {
  const res = await api.get(`/books/${id}/reviews/average`);
  return "success" in res.data ? res.data.data : res.data;
};
export const createReview = async (
  bookId: string,
  data: { userName: string; rating: number; comment: string }
) => {
  const res = await api.post(`/books/${bookId}/reviews`, data);
  return "success" in res.data ? res.data.data : res.data;
};