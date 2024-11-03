import { User } from './User';
import { Flashcard } from './Flashcard';
import { Status } from './Status';

export interface Progress {
  id: number;
  userId: number;
  flashcardId: number;
  status: Status;
  lastReviewed?: Date;
  timesReviewed: number;
  user: User;
  flashcard: Flashcard;
}