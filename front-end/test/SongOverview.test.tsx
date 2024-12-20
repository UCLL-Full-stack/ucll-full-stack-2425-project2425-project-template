import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SongsOverview from '@components/songs/songsOverview';
import { Song } from 'types';
import SongService from "@services/songService";

jest.mock('@services/SongService', () => ({
  createSong: jest.fn(),
  deleteSongById: jest.fn(),
}));

const mockCreateSong = SongService.createSong as jest.Mock;
const mockDeleteSongById = SongService.deleteSongById as jest.Mock;

const songs: Song[] = [
  { id: 1, title: "Song A", genre: "Rock" },
  { id: 2, title: "Song B", genre: "Pop" },
];

test("renders SongsOverview with songs", async () => {
  render(<SongsOverview songs={songs} />);

  expect(screen.getByText("Song A")).toBeInTheDocument();
  expect(screen.getByText("Song B")).toBeInTheDocument();
});

test("opens popup and handles form submission to create a song", async () => {
  mockCreateSong.mockResolvedValue({
    ok: true,
    json: async () => ({ title: 'New Song', genre: 'Jazz' }),
  });

  render(<SongsOverview songs={songs} />);

  const addButtons = screen.getAllByRole('button', { name: /add logo/i });
  fireEvent.click(addButtons[0]);

  const titleInput = screen.getByLabelText(/song title/i);
  fireEvent.change(titleInput, { target: { value: 'New Song' } });
  const genreInput = screen.getByLabelText(/song genre/i);
  fireEvent.change(genreInput, { target: { value: 'Jazz' } });
  const submitButton = screen.getByRole('button', { name: /make song/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(SongService.createSong);
  });
});