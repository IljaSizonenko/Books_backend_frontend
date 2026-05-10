export interface Book { 
    id: number; 
    title: string; 
    isbn: string;
    publishedYear: number; 
    pageCount: number;
    language: string;
    description: string;
    coverImage?: string;
    authorId: number;
    publisherId: number;
    genreIds: number[];
    createdAt: string;
    updatedAt: string;
}
export interface Review {
    id: number;
    bookId: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}
export interface BooksQueryParams {
  title?: string;
  year?: number;
  language?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
export type BooksApiResponse =
  | {
      success: true;
      data: Book[];
      pagination: {
        page: number;
        limit: number;
        total: number;
      };
    }
  | {
      page: number;
      limit: number;
      total: number;
      data: Book[];
    };
export interface PrismaAuthor {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
  nationality: string;
  biography: string;
  createdAt: string;
  updatedAt: string;
}
export interface PrismaPublisher {
  id: number;
  name: string;
  country: string;
  foundedYear: number;
  website: string;
  createdAt: string;
  updatedAt: string;
}
export interface PrismaGenre {
  id: number;
  name: string;
}
export interface PrismaReview {
  id: number;
  bookId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export interface PrismaBook {
  id: number;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string | null;
  authorId: number;
  publisherId: number;
  genreIds: number[];
  createdAt: string;
  updatedAt: string;
  author?: PrismaAuthor;
  publisher?: PrismaPublisher;
  genres?: PrismaGenre[];
  reviews?: PrismaReview[];
}
export interface MockBook {
  id: number;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string | null;
}
export type UnifiedBook = MockBook & {
  author?: PrismaAuthor;
  publisher?: PrismaPublisher;
  genres?: PrismaGenre[];
  reviews?: PrismaReview[];
};
export interface CreateBookForm {
  title: string;
  isbn: string;
  publishedYear: string;
  pageCount: string;
  language: string;
  description: string;
  coverImage?: string;
  authorId: number;
  publisherId: number;
  genreIds: number[];
}
export interface CreateBookPayload {
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string; // en, et, fr, de
  description: string;
  coverImage?: string;
  authorId: number;
  publisherId: number;
  genreIds: number[];
}
export type UnifiedBookDetail = {
  id: number;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string | null;
  authorName?: string;
  publisherName?: string;
  genres: string[];
};