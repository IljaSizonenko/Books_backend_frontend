import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getBook, updateBook } from "../api/api";
import type { Book } from "../api/types";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  // Load book data
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    getBook(id)
      .then((data) => {
        setBook(data);
        // Pre-fill form
        setTitle(data.title);
        setIsbn(data.isbn);
        setPublishedYear(String(data.publishedYear));
        setPageCount(String(data.pageCount));
        setLanguage(data.language);
        setDescription(data.description);
      })
      .catch(() => setError("Failed to load book"))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError("");
    try {
      await updateBook(id, {
        title,
        isbn,
        publishedYear: Number(publishedYear),
        pageCount: Number(pageCount),
        language,
        description,
        authorId: book?.authorId ?? 1,
        publisherId: book?.publisherId ?? 1,
        genreIds: book?.genreIds ?? [],
      });
      navigate(`/books/${id}`);
    } catch {
      setError("Failed to update book");
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!book) return <div className="p-4">Book not found</div>;
  return (
    <div className="p-4 space-y-4">
      <Link to={`/books/${id}`} className="text-blue-600 hover:underline">
         Back to details
      </Link>
      <h1 className="text-2xl font-bold">Edit book</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Published year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Page count"
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}