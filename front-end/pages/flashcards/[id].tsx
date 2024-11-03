import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFlashcardById } from '../../services/flashcardService';
import { Flashcard } from '../../types';

const FlashcardDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch flashcard details
      getFlashcardById(Number(id)).then((data) => setFlashcard(data));
    }
  }, [id]);

  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Flashcard Detail</h1>
      <h2>{flashcard.question}</h2>
      <p>{flashcard.answer}</p>
    </div>
  );
};

export default FlashcardDetailPage;