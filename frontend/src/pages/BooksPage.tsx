import { useEffect, useState } from "react";
import axios from "axios";
import { getBooks, deleteBook } from "../api/api.js";
import type { UnifiedBook } from "../api/types.js";
import { Link } from "react-router-dom";

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
export default function BooksPage() {
  const [books, setBooks] = useState<UnifiedBook[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Filters
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const debouncedTitle = useDebounce(title);
  const debouncedYear = useDebounce(year);
  const debouncedLanguage = useDebounce(language);
  // Sorting
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { page, limit } = pagination;
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      setError("");
      try {
        const { books, pagination: serverPagination } = await getBooks(
          {
            title: debouncedTitle || undefined,
            year:
              debouncedYear.trim() === "" || isNaN(Number(debouncedYear))
                ? undefined
                : Number(debouncedYear),
            language: debouncedLanguage || undefined,
            sortBy: sortBy || undefined,
            order,
            page,
            limit,
          },
          controller.signal
        );
        setBooks(books);
        setPagination((prev) => ({
          ...prev,
          total: serverPagination.total,
        }));
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("BOOKS ERROR:", err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [
    debouncedTitle,
    debouncedYear,
    debouncedLanguage,
    sortBy,
    order,
    page,
    limit,
  ]);
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <Link
        to="/books/create"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add book
      </Link>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        />
        <input
          className="border p-2"
          placeholder="Year"
          type="number"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        />
        <select
          className="border p-2"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        >
          <option value="">All languages</option>
          <option value="en">EN</option>
          <option value="et">ET</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
        </select>
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-4 mb-4">
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          onClick={() =>
            setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
          }
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          onClick={() =>
            setPagination((p) => ({ ...p, page: p.page + 1 }))
          }
          disabled={page >= totalPages}
        >
          Next
        </button>
        <select
          className="border p-2"
          value={limit}
          onChange={(e) =>
            setPagination((p) => ({
              ...p,
              limit: Number(e.target.value),
              page: 1,
            }))
          }
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      {/* Sorting */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        >
          <option value="">No sorting</option>
          <option value="title">Title</option>
          <option value="publishedYear">Year</option>
        </select>
        <select
          className="border p-2"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value as "asc" | "desc");
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {/* Books list */}
      <ul className="space-y-2">
        {books.map((b) => (
          <li key={b.id} className="border p-3 rounded">
            <div className="font-semibold">{b.title}</div>
            <div className="text-sm text-gray-600">
              {b.publishedYear} — {b.language}
            </div>
            <div className="flex gap-4 mt-2">
              <Link
                to={`/books/${b.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
              <button
                className="text-red-600 hover:underline"
                onClick={async () => {
                  if (!confirm("Are you sure you want to delete this book?"))
                    return;
                  try {
                    await deleteBook(String(b.id));
                    setBooks((prev) => prev.filter((x) => x.id !== b.id));
                    setPagination((p) => ({
                      ...p,
                      total: p.total - 1,
                    }));
                  } catch (err) {
                    console.error("DELETE ERROR:", err);
                    setError("Failed to load books");
                  }
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}