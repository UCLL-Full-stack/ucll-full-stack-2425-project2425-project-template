import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import ReviewForm from "../../components/review/review";

const ReviewPage: React.FC = () => {
  const router = useRouter();
  const movieId = router.query;

  const handleSuccess = () => {
    router.push(`/movies/${movieId}`);
  };

  if (!movieId) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>Spilled Popcorn</title>
        <meta name="description" content="Write a review for your favorite movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className="min-h-screen max-w-screen flex flex-col-reverse md:flex-row">
        <Header />
        <main className="p-1 flex-grow flex justify-center items-center">
          <div className="space-y-8 max-w-xs">
            <ReviewForm userId={1} movieId={Number(movieId)} onSuccess={handleSuccess} />
          </div>
        </main>
      </div>
    </>
  );
};

export default ReviewPage;
