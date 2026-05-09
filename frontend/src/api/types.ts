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
  publishedYear?: number;
  language?: string;
  sort?: string;
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
