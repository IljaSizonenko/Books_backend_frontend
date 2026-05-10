import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBook } from "../api/api.js";
import type { CreateBookForm } from "../api/types.js";
const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "et", label: "Estonian" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
];
export default function AddBookPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateBookForm>({
    title: "",
    isbn: "",
    publishedYear: "",
    pageCount: "",
    language: "",
    description: "",
    coverImage: "",
    authorId: 9,
    publisherId: 3,
    genreIds: [6],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof CreateBookForm>(
    field: K,
    value: CreateBookForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createBook({
        title: form.title,
        isbn: form.isbn,
        publishedYear: Number(form.publishedYear),
        pageCount: Number(form.pageCount),
        language: form.language,
        description: form.description,
        coverImage: form.coverImage || undefined,
        authorId: form.authorId,
        publisherId: form.publisherId,
        genreIds: form.genreIds,
      });

      navigate("/books");
    } catch (err) {
      console.error("CREATE ERROR:", err);
      setError("Failed to create book");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <Link to="/books" className="text-blue-600 hover:underline">
        Back to list
      </Link>
      <h1 className="text-2xl font-bold">Add new book</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="ISBN"
          value={form.isbn}
          onChange={(e) => update("isbn", e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Published year"
          value={form.publishedYear ?? ""}
          onChange={(e) => update("publishedYear", e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Page count"
          value={form.pageCount ?? ""}
          onChange={(e) => update("pageCount", e.target.value)}
          required
        />
        <select
          className="border p-2 w-full"
          value={form.language}
          onChange={(e) => update("language", e.target.value)}
          required
        >
          <option value="">Select language</option>
          {LANGUAGE_OPTIONS.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Cover image URL"
          value={form.coverImage ?? ""}
          onChange={(e) => update("coverImage", e.target.value)}
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