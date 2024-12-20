import { Playlist } from "../../model/playlist";
import { Song } from "../../model/song";
import { User } from "../../model/user";
import playlistDb from "../../repository/playlist.db";
import songDb from "../../repository/song.db";
import userDb from "../../repository/user.db";
import playlistService from "../../service/playlist.service";
import { Role } from "../../types";

const mockUser = new User({ id: 1, firstName: "John", lastName: "Doe", username: 'JohnDoe', email: 'john@example.com', role: "admin", password: "password123" });
const mockPlaylist = new Playlist({ name: 'Favorites', user: mockUser, totalNumbers: 0, songs: [] });
const mockSong = new Song({ id: 1, title: 'Song 1', genre: "Country" });

let mockPlaylistDbGetAllPlaylists: jest.Mock;
let mockPlaylistDbGetPlaylistsFromUser: jest.Mock;
let mockPlaylistDbGetPlaylistById: jest.Mock;
let mockPlaylistDbCreatePlaylist: jest.Mock;
let mockPlaylistDbUpdateAndAddSongToPlaylist: jest.Mock;
let mockSongDbGetSongById: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    mockPlaylistDbGetAllPlaylists = jest.fn();
    mockPlaylistDbGetPlaylistsFromUser = jest.fn();
    mockPlaylistDbGetPlaylistById = jest.fn();
    mockPlaylistDbCreatePlaylist = jest.fn();
    mockPlaylistDbUpdateAndAddSongToPlaylist = jest.fn();
    mockSongDbGetSongById = jest.fn();
    mockUserDbGetUserById = jest.fn();

    playlistDb.getAllPlaylists = mockPlaylistDbGetAllPlaylists;
    playlistDb.getPlaylistsFromUser = mockPlaylistDbGetPlaylistsFromUser;
    playlistDb.getPlaylistById = mockPlaylistDbGetPlaylistById;
    playlistDb.createPlaylist = mockPlaylistDbCreatePlaylist;
    playlistDb.UpdateAndAddSongToPlaylist = mockPlaylistDbUpdateAndAddSongToPlaylist;
    songDb.getSongById = mockSongDbGetSongById;
    userDb.getUserById = mockUserDbGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid user and playlist name, when: createPlaylist is called, then: it returns the created playlist', async () => {
    mockUserDbGetUserById.mockResolvedValue(mockUser);
    mockPlaylistDbCreatePlaylist.mockResolvedValue(mockPlaylist);

    const input = { name: 'Favorites', user: { id: 1 } };

    const result = await playlistService.createPlaylist(input);

    expect(result).toEqual(mockPlaylist);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: 1 });
    expect(mockPlaylistDbCreatePlaylist).toHaveBeenCalledWith(expect.any(Playlist));
});


test('given: user not found, when: createPlaylist is called, then: it throws an error', async () => {
    mockUserDbGetUserById.mockResolvedValue(null);

    const input = { name: 'Favorites', user: { id: 1 } };

    await expect(playlistService.createPlaylist(input))
        .rejects
        .toThrow('User not found');
});

test('given: admin role, when: getAllPlaylists is called, then: it returns all playlists', async () => {
    mockPlaylistDbGetAllPlaylists.mockResolvedValue([mockPlaylist]);

    const result = await playlistService.getAllPlaylists({ username: 'admin', role: 'admin' });

    expect(result).toEqual([mockPlaylist]);
    expect(mockPlaylistDbGetAllPlaylists).toHaveBeenCalledTimes(1);
});

test('given: user role, when: getAllPlaylists is called, then: it returns playlists for the user', async () => {
    mockPlaylistDbGetPlaylistsFromUser.mockResolvedValue([mockPlaylist]);

    const result = await playlistService.getAllPlaylists({ username: 'John', role: 'user' });

    expect(result).toEqual([mockPlaylist]);
    expect(mockPlaylistDbGetPlaylistsFromUser).toHaveBeenCalledWith({ username: 'John' });
});

test('given: invalid role, when: getAllPlaylists is called, then: it throws an error', async () => {
    await expect(playlistService.getAllPlaylists({ username: 'John', role: null as unknown as Role }))
        .rejects
        .toThrow('Unauthorized access');
});

test('given: valid playlist ID, when: getPlaylistById is called, then: it returns the playlist', async () => {
    mockPlaylistDbGetPlaylistById.mockResolvedValue(mockPlaylist);

    const result = await playlistService.getPlaylistById({ id: 1 });

    expect(result).toEqual(mockPlaylist);
    expect(mockPlaylistDbGetPlaylistById).toHaveBeenCalledWith({ id: 1 });
});

test('given: invalid playlist ID, when: getPlaylistById is called, then: it throws an error', async () => {
    mockPlaylistDbGetPlaylistById.mockResolvedValue(null);

    await expect(playlistService.getPlaylistById({ id: 99 }))
        .rejects
        .toThrow('Playlist with id 99 does not exist');
    expect(mockPlaylistDbGetPlaylistById).toHaveBeenCalledWith({ id: 99 });
});

test('given: valid playlist and songs, when: addSongToPlaylist is called, then: it updates the playlist with the songs', async () => {
    mockPlaylistDbGetPlaylistById.mockResolvedValue(mockPlaylist);
    mockSongDbGetSongById.mockResolvedValue(mockSong);
    mockPlaylistDbUpdateAndAddSongToPlaylist.mockResolvedValue(mockPlaylist);

    const input = {
        playlist: { id: 1 },
        songs: [{ id: 1 }]
    };

    const result = await playlistService.addSongToPlaylist(input);

    expect(result).toEqual(mockPlaylist);
    expect(mockPlaylistDbGetPlaylistById).toHaveBeenCalledWith({ id: 1 });
    expect(mockSongDbGetSongById).toHaveBeenCalledWith({ id: 1 });
    expect(mockPlaylistDbUpdateAndAddSongToPlaylist).toHaveBeenCalledWith({ playlist: expect.any(Playlist) });
});

test('given: duplicate song in playlist, when: addSongToPlaylist is called, then: it throws an error', async () => {
    mockPlaylistDbGetPlaylistById.mockResolvedValue(mockPlaylist);
    mockSongDbGetSongById.mockResolvedValue(mockSong);
    mockPlaylist.addSongtoPlaylist(mockSong);

    const input = {
        playlist: { id: 1 },
        songs: [{ id: 1 }]
    };

    await expect(playlistService.addSongToPlaylist(input))
        .rejects
        .toThrow('This song is already added to the playlist');
});
