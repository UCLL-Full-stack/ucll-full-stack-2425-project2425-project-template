import { Flashcard, FlashcardInput } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


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

export async function createFlashcard(data: FlashcardInput): Promise<Flashcard> {
  const response = await fetch(`${API_BASE_URL}/flashcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create flashcard');
  }
  return response.json();
}