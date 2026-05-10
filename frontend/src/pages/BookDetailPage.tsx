import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getBook,
  getReviews,
  getAverageRating,
  deleteBook,
  createReview
} from "../api/api.js";
import type { UnifiedBookDetail, Review } from "../api/types.js";
import ReviewForm from "../components/ReviewForm.js";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<UnifiedBookDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [bookData, reviewsData, ratingData] = await Promise.all([
          getBook(id),
          getReviews(id),
          getAverageRating(id),
        ]);
        setBook(bookData);
        setReviews(reviewsData);
        setRating(ratingData?.averageRating ?? null);
      } catch (err) {
        console.error("DETAIL ERROR:", err);
        setError("Unable to load book details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);
  if (!id) return <div className="p-4 text-red-500">Invalid book ID</div>;
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!book) return <div className="p-4">Book not found</div>;
  const handleAddReview = async (data: {
    userName: string;
    rating: number;
    comment: string;
  }) => {
    if (!id) return;
    await createReview(id, data);
    const updatedReviews = await getReviews(id);
    setReviews(updatedReviews);
    const updatedRating = await getAverageRating(id);
    setRating(updatedRating?.averageRating ?? null);
  };
  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this book?")) return;
    setDeleting(true);
    try {
      await deleteBook(id);
      navigate("/books");
    } catch {
      alert("Failed to delete book");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="p-4 space-y-6">
      <Link to="/books" className="text-blue-600 hover:underline">
        Back to list
      </Link>
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <div className="space-x-4">
        <Link
          to={`/books/${id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-600 hover:underline"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      <div className="text-gray-700 space-y-1">
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Year:</strong> {book.publishedYear}</p>
        <p><strong>Pages:</strong> {book.pageCount}</p>
        <p><strong>Language:</strong> {book.language}</p>
        <p><strong>Description:</strong> {book.description}</p>
        {book.authorName && <p><strong>Author:</strong> {book.authorName}</p>}
        {book.publisherName && <p><strong>Publisher:</strong> {book.publisherName}</p>}
        {book.genres?.length > 0 && (
          <p><strong>Genres:</strong> {book.genres.join(", ")}</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold">Average rating</h2>
        <p>{rating ?? "No rating yet"}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet</p>}
        <ul className="space-y-2">
          {reviews.map((r) => (
            <li key={r.id} className="border p-3 rounded">
              <div className="font-semibold">{r.userName}</div>
              <div className="text-yellow-600">Rating: {r.rating}</div>
              <div>{r.comment}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <ReviewForm onSubmit={handleAddReview} />
      </div>
    </div>
  );
}