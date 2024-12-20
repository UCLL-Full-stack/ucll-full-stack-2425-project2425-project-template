import { Song } from "../../model/song";
import songDb from "../../repository/song.db";
import userDb from "../../repository/user.db";
import songService from "../../service/song.service";
import { Role } from "../../types";

const mockSong = new Song({ id: 1, title: 'Song Title', genre: 'Rock' });
const mockUser = { id: 1, role: 'admin', getRole: () => 'admin' };

let mockSongDbCreateSong: jest.Mock;
let mockSongDbGetAllSongs: jest.Mock;
let mockSongDbGetSongById: jest.Mock;
let mockSongDbDeleteSongById: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    mockSongDbCreateSong = jest.fn();
    mockSongDbGetAllSongs = jest.fn();
    mockSongDbGetSongById = jest.fn();
    mockSongDbDeleteSongById = jest.fn();
    mockUserDbGetUserById = jest.fn();

    songDb.createSong = mockSongDbCreateSong;
    songDb.getAllSongs = mockSongDbGetAllSongs;
    songDb.getSongById = mockSongDbGetSongById;
    songDb.deleteSongById = mockSongDbDeleteSongById;
    userDb.getUserById = mockUserDbGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid song input and admin user, when: createSong is called, then: it returns the created song', async () => {
    mockSongDbCreateSong.mockResolvedValue(mockSong);
    mockUserDbGetUserById.mockResolvedValue(mockUser);

    const input = { title: 'Song Title', genre: 'Rock' };
    const userInput = { id: 1 };

    const result = await songService.createSong(input, userInput);

    expect(result).toEqual(mockSong);
    expect(mockSongDbCreateSong).toHaveBeenCalledWith(expect.any(Song));
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: 1 });
});

test('given: user without permission, when: createSong is called, then: it throws an error', async () => {
    mockUserDbGetUserById.mockResolvedValue({ ...mockUser, getRole: () => 'user' });

    const input = { title: 'Song Title', genre: 'Rock' };
    const userInput = { id: 1 };

    await expect(songService.createSong(input, userInput))
        .rejects
        .toThrow('A user cannot make songs');
});

test('given: valid role, when: getAllSongs is called, then: it returns all songs', async () => {
    mockSongDbGetAllSongs.mockResolvedValue([mockSong]);

    const result = await songService.getAllSongs({ role: 'admin' });

    expect(result).toEqual([mockSong]);
    expect(mockSongDbGetAllSongs).toHaveBeenCalledTimes(1);
});

test('given: missing role, when: getAllSongs is called, then: it throws an error', async () => {
    await expect(songService.getAllSongs({ role: null as unknown as Role }))
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
        .toThrow('Song with id 99 does not exist');

    expect(mockSongDbGetSongById).toHaveBeenCalledWith({ id: 99 });
});

test('given: valid song ID and admin user, when: deleteSongById is called, then: it deletes the song', async () => {
    mockSongDbDeleteSongById.mockResolvedValue(true);
    mockUserDbGetUserById.mockResolvedValue(mockUser);

    const userInput = { id: 1 };
    const result = await songService.deleteSongById({ id: 1 }, userInput);

    expect(result).toBe(true);
    expect(mockSongDbDeleteSongById).toHaveBeenCalledWith({ id: 1 });
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: 1 });
});

test('given: user without permission, when: deleteSongById is called, then: it throws an error', async () => {
    mockUserDbGetUserById.mockResolvedValue({ ...mockUser, getRole: () => 'user' });

    const userInput = { id: 1 };

    await expect(songService.deleteSongById({ id: 1 }, userInput))
        .rejects
        .toThrow('A user cannot delete songs');
});

test('given: invalid song ID, when: deleteSongById is called, then: it throws an error', async () => {
    mockSongDbDeleteSongById.mockResolvedValue(null);
    mockUserDbGetUserById.mockResolvedValue(mockUser);

    const userInput = { id: 1 };

    await expect(songService.deleteSongById({ id: 99 }, userInput))
        .rejects
        .toThrow('Song with id 99 does not exist');

    expect(mockSongDbDeleteSongById).toHaveBeenCalledWith({ id: 99 });
});
