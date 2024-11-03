import { Flashcard } from './Flashcard';

export interface Category {
  id: number;
  name: string;
  description?: string;
  flashcards: Flashcard[];
}