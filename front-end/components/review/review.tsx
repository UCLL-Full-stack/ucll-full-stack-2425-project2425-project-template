import React, { useState } from 'react';

interface ReviewFormProps {
  userId: number;
  movieId: number;
  onSuccess: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ userId, movieId }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, rating, userId, movieId }),
    });

    if (response.ok) {
      setMessage('Review submitted successfully!');
      setText('');
      setRating(0);
    } else {
      setMessage('Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your review"
        required
      />
      <div>
        <label>Rating:</label>
        {[...Array(5)].map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setRating(i + 1)}
            style={{ color: i < rating ? 'gold' : 'gray' }}
          >
            ★
          </button>
        ))}
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ReviewForm;