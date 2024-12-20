import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlaylistOverview from '@components/playlists/playlistOverview';
import PlaylistService from '@services/playlistService';
import { Playlist, Song } from 'types';

jest.mock('@services/playlistService', () => ({
  createPlaylist: jest.fn(),
  addSongToPlaylist: jest.fn(),
}));

const mockCreatePlaylist = PlaylistService.createPlaylist as jest.Mock;
const mockAddSongToPlaylist = PlaylistService.addSongToPlaylist as jest.Mock;

const playlists: Playlist[] = [
  {
    id: 1,
    name: "Rock Classics",
    totalNumbers: 10,
    user: { username: "John" },
    songs: [],
  },
  {
    id: 2,
    name: "Pop Hits",
    totalNumbers: 8,
    user: { username: "Sarah" },
    songs: [],
  },
];

const songs: Song[] = [
  { id: 1, title: "Song A", genre: "Rock" },
  { id: 2, title: "Song B", genre: "Pop" },
];

test("renders PlaylistOverview with playlists and songs", async () => {
  render(<PlaylistOverview playlists={playlists} songs={songs} />);

  expect(screen.getByText("Rock Classics")).toBeInTheDocument();
  expect(screen.getByText("Pop Hits")).toBeInTheDocument();

  const playlistItem = screen.getByText("Rock Classics");
  fireEvent.click(playlistItem);

  expect(screen.getByText("Song A")).toBeInTheDocument();
  expect(screen.getByText("Song B")).toBeInTheDocument();
});

test("opens popup and handles form submission to create a playlist", async () => {
  mockCreatePlaylist.mockResolvedValue({
    ok: true,
    json: async () => ({ name: 'Playlist' }),
  });

  render(<PlaylistOverview playlists={playlists} songs={songs} />);

  const addButton = screen.getByRole('button', { name: /add logo/i });
  fireEvent.click(addButton);

  const input = screen.getByLabelText(/playlist name/i);
  fireEvent.change(input, { target: { value: 'Playlist' } });
  const submitButton = screen.getByRole('button', { name: /make playlist/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(PlaylistService.createPlaylist).toHaveBeenCalledWith('Playlist');
  });
});

test("selects a playlist and adds a song to it", async () => {
  render(<PlaylistOverview playlists={playlists} songs={songs} />);

  const playlistItem = screen.getByText("Rock Classics");
  fireEvent.click(playlistItem);

  const addButtons = screen.getAllByText("Add song", { selector: 'button' });
  fireEvent.click(addButtons[0]);

  await waitFor(() => {
    expect(PlaylistService.addSongToPlaylist).toHaveBeenCalledWith(playlists[0], songs[0]);
  });
});