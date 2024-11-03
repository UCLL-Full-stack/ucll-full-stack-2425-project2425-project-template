export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  categoryId?: number;
  createdAt: string;
  updatedAt: string;
}