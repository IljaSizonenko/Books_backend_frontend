import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBook } from "../api/api.js";

export default function AddBookPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createBook({
        title,
        isbn,
        publishedYear: Number(publishedYear),
        pageCount: Number(pageCount),
        language,
        description,
        authorId: 1,
        publisherId: 1,
        genreIds: [],
      });
      navigate("/books");
    } catch {
      setError("Failed to create book");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <Link to="/books" className="text-blue-600 hover:underline">
        ← Back to list
      </Link>
      <h1 className="text-2xl font-bold">Add new book</h1>
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
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Add book"}
        </button>
      </form>
    </div>
  );
}