import { Playlist } from "../../model/playlist";
import { Song } from "../../model/song";
import { User } from "../../model/user";
import { Role } from "../../types";


const validUser = new User({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "user" as Role,
    password: "Password1",
});

const validSong1 = new Song({
    id: 1,
    title: "Song 1",
    genre: "country"
});

const validSong2 = new Song({
    id: 2,
    title: "Song 2",
    genre: "rap"
});

const validPlaylist = {
    id: 1,
    name: "My Playlist",
    totalNumbers: 2,
    songs: [validSong1, validSong2],
    user: validUser,
};

test('given valid values for Playlist, when Playlist is created, then Playlist is created with those values', () => {
    const playlist = new Playlist(validPlaylist);

    expect(playlist.getId()).toEqual(1);
    expect(playlist.getName()).toEqual("My Playlist");
    expect(playlist.getTotalNumbers()).toEqual(2);
    expect(playlist.getSongs()).toEqual([validSong1, validSong2]);
    expect(playlist.getUser()).toEqual(validUser);
});

test('given a missing name, when Playlist is created, then throws an error', () => {
    const invalidPlaylist = { ...validPlaylist, name: "" };
    const createPlaylist = () => new Playlist(invalidPlaylist);

    expect(createPlaylist).toThrow('Playlist name is required!');
});


test('given two Playlist objects with the same values, when equals is called, then returns true', () => {
    const playlist1 = new Playlist(validPlaylist);
    const playlist2 = new Playlist(validPlaylist);

    expect(playlist1.equals(playlist2)).toBe(true);
});

test('given two Playlist objects with different values, when equals is called, then returns false', () => {
    const playlist1 = new Playlist(validPlaylist);
    const playlist2 = new Playlist({ ...validPlaylist, name: "Different Playlist" });

    expect(playlist1.equals(playlist2)).toBe(false);
});

test('when adding a song to Playlist, then the song is added to the playlist', () => {
    const playlist = new Playlist({ ...validPlaylist, songs: [] });

    playlist.addSongtoPlaylist(validSong1);

    expect(playlist.getSongs()).toEqual([validSong1]);
});

test('when adding a duplicate song to Playlist, then the song is not added again', () => {
    const playlist = new Playlist({ ...validPlaylist, songs: [validSong1] });

    playlist.addSongtoPlaylist(validSong1);

    expect(playlist.getSongs()).toEqual([validSong1]);
});

test('when id is set, then getId returns the correct value', () => {
    const playlist = new Playlist(validPlaylist);

    expect(playlist.getId()).toEqual(1);
});

test('when id is not set, then getId returns undefined', () => {
    const playlist = new Playlist({ ...validPlaylist, id: undefined });

    expect(playlist.getId()).toBeUndefined();
});

test('when getting user from Playlist, then the correct user is returned', () => {
    const playlist = new Playlist(validPlaylist);

    expect(playlist.getUser()).toEqual(validUser);
});

test('when getting songs from Playlist, then the correct songs are returned', () => {
    const playlist = new Playlist(validPlaylist);

    expect(playlist.getSongs()).toEqual([validSong1, validSong2]);
});

test('when creating Playlist from Prisma, then values are mapped correctly', () => {
    const prismaPlaylist = {
        id: 1,
        name: "My Playlist",
        totalNumbers: 2,
        userId: 1,
        songs: [{ id: 1, title: "Song 1", genre: "Pop", artist: "Artist 1", duration: 180 }],
        user: { id: 1, username: "johndoe", firstName: "John", lastName: "Doe", email: "john.doe@example.com", role: "user", password: "Password1" },
    };

    const playlist = Playlist.from(prismaPlaylist);

    expect(playlist.getId()).toEqual(1);
    expect(playlist.getName()).toEqual("My Playlist");
    expect(playlist.getTotalNumbers()).toEqual(2);
    expect(playlist.getSongs().length).toEqual(1);
    expect(playlist.getSongs()[0].getTitle()).toEqual("Song 1");
    expect(playlist.getUser().getUsername()).toEqual("johndoe");
});