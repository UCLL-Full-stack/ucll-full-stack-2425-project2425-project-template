import { Assignment } from './Assignment';
import { Progress } from './Progress';
import { Category } from './Category';

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  categoryId?: number;
  category?: Category;
  assignments: Assignment[];
  progresses: Progress[];
  createdAt: Date;
  updatedAt: Date;
}