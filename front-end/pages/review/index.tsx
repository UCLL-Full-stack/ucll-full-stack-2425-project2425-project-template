import React from "react";
import { useRouter } from "next/router";
import review from "../../components/review/review";
import ReviewForm from "../../components/review/review";

const ReviewPage: React.FC = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const handleSuccess = () => {
    router.push(`/movies/${movieId}`);
  };

  if (!movieId) return <p>Loading...</p>;

  return (
    <div>
      <h1>Write a Review</h1>
      <ReviewForm userId={1} movieId={Number(movieId)} onSuccess={handleSuccess} />
    </div>
  );
};

export default ReviewPage;
