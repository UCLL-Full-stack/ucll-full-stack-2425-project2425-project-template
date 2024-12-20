import { GetServerSideProps } from 'next';
import ReviewForm from '../../../components/review/review';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MoviePage = ({ movie }: any) => {
  const userId = 1; // Replace with authenticated user ID

  return (
    <div>
      <h1>{movie.title}</h1>
      <ReviewForm userId={userId} movieId={movie.id} onSuccess={() => { /* handle success */ }} />
      <h2>Reviews</h2>
      {movie.reviews.map((review: any) => (
        <div key={review.id}>
          <p>{review.text}</p>
          <p>Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const movie = await prisma.movie.findUnique({
    where: { id: Number(id) },
    include: { reviews: true },
  });

  if (!movie) {
    return { notFound: true };
  }

  return { props: { movie } };
};

export default MoviePage;
