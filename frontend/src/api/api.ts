import axios from "axios";
import type { Book, Review } from "./types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// GET all books
export const getBooks = async (signal?: AbortSignal) => {
  const res = await api.get<Book[]>("/books", { signal });
  return res.data;
};
// GET one book
export const getBook = async (id: string) => {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
};
// POST create book
export const createBook = async (data: Partial<Book>) => {
  const res = await api.post("/books", data);
  return res.data;
};
// PUT update book
export const updateBook = async (id: string, data: Partial<Book>) => {
  const res = await api.put(`/books/${id}`, data);
  return res.data;
};
// GET reviews
export const getReviews = async (id: string) => {
  const res = await api.get<Review[]>(`/books/${id}/reviews`);
  return res.data;
};
// GET average rating
export const getAverageRating = async (id: string) => {
  const res = await api.get<number>(`/books/${id}/average-rating`);
  return res.data;
};
// DELETE books
export const deleteBook = async (id: string) => {
  await api.delete(`/books/${id}`);
};
