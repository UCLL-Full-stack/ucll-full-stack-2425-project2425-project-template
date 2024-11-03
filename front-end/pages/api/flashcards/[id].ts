import { NextApiRequest, NextApiResponse } from 'next';
import { Flashcard } from '../../../types';

const flashcards: Flashcard[] = [
  // Same as before
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const flashcard = flashcards.find((f) => f.id === Number(id));

  if (flashcard) {
    res.status(200).json(flashcard);
  } else {
    res.status(404).json({ error: 'Flashcard not found' });
  }
};