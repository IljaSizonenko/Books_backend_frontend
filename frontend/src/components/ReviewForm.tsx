import { useState } from "react";

interface Props {
  onSubmit: (data: {
    userName: string;
    rating: number;
    comment: string;
  }) => Promise<void>;
}

export default function ReviewForm({ onSubmit }: Props) {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit({ userName, rating, comment });
      setUserName("");
      setRating(5);
      setComment("");
    } catch {
      setError("Failed to submit review");
    } finally {
      setSaving(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded">
      <h3 className="text-lg font-semibold">Add a review</h3>
      {error && <div className="text-red-500">{error}</div>}
      <input
        className="border p-2 w-full"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <select
        className="border p-2 w-full"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} *
          </option>
        ))}
      </select>
      <textarea
        className="border p-2 w-full"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}