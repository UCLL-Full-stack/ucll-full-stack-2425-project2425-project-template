import { NextPage } from 'next';
import FlashcardList from '../../components/FlashcardList';
import { useEffect, useState } from 'react';
import { getFlashcards } from '../../services/flashcardService';
import { Flashcard } from '../../types';

const FlashcardsPage: NextPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    // Fetch flashcards from the API
    getFlashcards().then((data) => setFlashcards(data));
  }, []);

  return (
    <div>
      <h1>Flashcards</h1>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default FlashcardsPage;