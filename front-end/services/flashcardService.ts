import { Flashcard } from '../services/types';

const API_BASE_URL = '/api';

export async function getFlashcards(): Promise<Flashcard[]> {
  const response = await fetch(`${API_BASE_URL}/flashcards`);
  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }
  return response.json();
}

export async function getFlashcardById(id: number): Promise<Flashcard> {
  const response = await fetch(`${API_BASE_URL}/flashcards/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch flashcard');
  }
  return response.json();
}