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

type PrismaBooksResponse = {
  success: true;
  data: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

type MockBooksResponse = {
  page: number;
  limit: number;
  total: number;
  data: Book[];
};

export type BooksApiResponse = PrismaBooksResponse | MockBooksResponse;