import { useEffect, useState } from "react";
import { getBooks } from "../api/api";
import type { Book } from "../api/types";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    getBooks(controller.signal)
      .then(setBooks)
      .catch(() => setError("Unable to download the books"))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
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