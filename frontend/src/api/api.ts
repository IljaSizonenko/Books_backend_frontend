import axios from "axios";
import type { Book, BooksApiResponse } from "./types.js";

export interface BooksQueryParams {
  title?: string;
  year?: number;
  language?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// GET all books
export const getBooks = async (
  params?: BooksQueryParams,
  signal?: AbortSignal
) => {
  const res = await api.get<BooksApiResponse>("/books", { params, signal });
  const raw = res.data;
  if ("success" in raw) {
    return {
      books: raw.data,
      pagination: raw.pagination,
    };
  }
  return {
    books: raw.data,
    pagination: {
      page: raw.page,
      limit: raw.limit,
      total: raw.total,
    },
  };
};
// GET one book
export const getBook = async (id: string) => {
  const res = await api.get(`/books/${id}`);
  return "success" in res.data ? res.data.data : res.data;
};
// POST create book
export const createBook = async (data: Partial<Book>) => {
  const res = await api.post("/books", data);
  return "success" in res.data ? res.data.data : res.data;
};
// PUT update book
export const updateBook = async (id: string, data: Partial<Book>) => {
  const res = await api.put(`/books/${id}`, data);
  return "success" in res.data ? res.data.data : res.data;
};
// DELETE book
export const deleteBook = async (id: string) => {
  await api.delete(`/books/${id}`);
};
// GET reviews
export const getReviews = async (id: string) => {
  const res = await api.get(`/books/${id}/reviews`);
  return "success" in res.data ? res.data.data : res.data;
};
// GET average rating
export const getAverageRating = async (id: string) => {
  const res = await api.get(`/books/${id}/average-rating`);
  return "success" in res.data ? res.data.data : res.data;
};
// POST create review
export const createReview = async (
  bookId: string,
  data: { userName: string; rating: number; comment: string }
) => {
  const res = await api.post(`/books/${bookId}/reviews`, data);
  return "success" in res.data ? res.data.data : res.data;
};