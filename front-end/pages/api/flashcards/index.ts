import { NextApiRequest, NextApiResponse } from 'next';
import { Flashcard } from '../../../services/types';

const flashcards: Flashcard[] = [
  {
    id: 1,
    question: 'What is the boiling point of water?',
    answer: '100°C',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    question: 'What is the capital of France?',
    answer: 'Paris',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    question: 'What is the largest planet in our solar system?',
    answer: 'Jupiter',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    question: 'What is the smallest country in the world?',
    answer: 'Vatican City',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    question: 'What is the capital of Australia?',
    answer: 'Canberra',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    question: 'What is the largest ocean on Earth?',
    answer: 'Pacific Ocean',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(flashcards);
};