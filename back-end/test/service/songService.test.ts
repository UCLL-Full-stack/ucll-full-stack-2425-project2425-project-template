import { Song } from "../../model/song";
import songDb from "../../repository/song.db";
import songService from "../../service/song.service";
import { Role } from "../../types";

const mockSong = new Song({ id: 1, title: 'Song Title', genre: 'Rock' });

let mockSongDbCreateSong: jest.Mock;
let mockSongDbGetAllSongs: jest.Mock;
let mockSongDbGetSongById: jest.Mock;

beforeEach(() => {
    mockSongDbCreateSong = jest.fn();
    mockSongDbGetAllSongs = jest.fn();
    mockSongDbGetSongById = jest.fn();

    songDb.createSong = mockSongDbCreateSong;
    songDb.getAllSongs = mockSongDbGetAllSongs;
    songDb.getSongById = mockSongDbGetSongById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid song input, when: createSong is called, then: it returns the created song', async () => {
    mockSongDbCreateSong.mockResolvedValue(mockSong);

    const input = { title: 'Song Title', genre: 'Rock' };

    const result = await songService.createSong(input);

    expect(result).toEqual(mockSong);
    expect(mockSongDbCreateSong).toHaveBeenCalledWith(expect.any(Song));
});

test('given: missing title, when: createSong is called, then: it throws an error', async () => {
    const input = { title: '', genre: 'Rock' };

    await expect(songService.createSong(input))
        .rejects
        .toThrow('title is required');
});

test('given: missing genre, when: createSong is called, then: it throws an error', async () => {
    const input = { title: 'Song Title', genre: '' };

    await expect(songService.createSong(input))
        .rejects
        .toThrow('Genre is required');
});

test('given: valid role, when: getAllSongs is called, then: it returns all songs', async () => {
    mockSongDbGetAllSongs.mockResolvedValue([mockSong]);

    const result = await songService.getAllSongs({ role: 'admin' });

    expect(result).toEqual([mockSong]);
    expect(mockSongDbGetAllSongs).toHaveBeenCalledTimes(1);
});

test('given: missing role, when: getAllSongs is called, then: it throws an error', async () => {
    await expect(songService.getAllSongs({ role: null as unknown as Role}))
        .rejects
        .toThrow('Unauthorized access');
});

test('given: valid song ID, when: getSongById is called, then: it returns the song', async () => {
    mockSongDbGetSongById.mockResolvedValue(mockSong);

    const result = await songService.getSongById({ id: 1 });

    expect(result).toEqual(mockSong);
    expect(mockSongDbGetSongById).toHaveBeenCalledWith({ id: 1 });
});

test('given: invalid song ID, when: getSongById is called, then: it throws an error', async () => {
    mockSongDbGetSongById.mockResolvedValue(null);

    await expect(songService.getSongById({ id: 99 }))
        .rejects
        .toThrow('User with id 99 does not exist');

    expect(mockSongDbGetSongById).toHaveBeenCalledWith({ id: 99 });
});
