import { useEffect, useState } from "react";
import { getBooks } from "../api/api.js";
import type { Book } from "../api/types.js";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "publishedYear" | "">("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const data = await getBooks(
          {
            title: title || undefined,
            year: year ? Number(year) : undefined,
            language: language || undefined,
            sortBy: sortBy || undefined,
            order,
            page,
            limit,
          },
          controller.signal
        );
        setBooks(data);
      } catch {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [title, year, language, sortBy, order, page, limit]);
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <Link
          to="/books/create"
          className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
        Lisa raamat
      </Link>
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          className="border p-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">All languages</option>
          <option value="EN">EN</option>
          <option value="ET">ET</option>
          <option value="RU">RU</option>
        </select>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="border px-3 py-1 rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
        <select
          className="border p-2"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "title" | "publishedYear" | "")
          }
        >
          <option value="">No sorting</option>
          <option value="title">Title</option>
          <option value="publishedYear">Year</option>
        </select>
        <select
          className="border p-2"
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul className="space-y-2">
        {books.map((b) => (
          <li key={b.id} className="border p-3 rounded">
            <div className="font-semibold">{b.title}</div>
            <div className="text-sm text-gray-600">
              {b.publishedYear} — {b.language}
            </div>
            <Link
              to={`/books/${b.id}`}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}