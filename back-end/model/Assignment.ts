import { User } from './User';
import { Flashcard } from './Flashcard';

export interface Assignment {
  id: number;
  userId: number;
  flashcardId: number;
  assignedAt: Date;
  user: User;
  flashcard: Flashcard;
}