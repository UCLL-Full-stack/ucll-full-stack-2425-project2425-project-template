import { Song } from "../../model/song";

// Mock valid song data
const validSong = {
    id: 1,
    title: "Bohemian Rhapsody",
    genre: "Rock",
};

// Tests
test('given valid values for Song, when Song is created, then Song is created with those values', () => {
    const song = new Song(validSong);

    expect(song.getId()).toEqual(1);
    expect(song.getTitle()).toEqual("Bohemian Rhapsody");
    expect(song.getGenre()).toEqual("Rock");
});

test('given a missing title, when Song is created, then throws an error', () => {
    const invalidSong = { ...validSong, title: "" };
    const createSong = () => new Song(invalidSong);

    expect(createSong).toThrow('Title is required');
});

test('given a missing genre, when Song is created, then throws an error', () => {
    const invalidSong = { ...validSong, genre: "" };
    const createSong = () => new Song(invalidSong);

    expect(createSong).toThrow('Genre is required');
});

test('given two Song objects with the same values, when equals is called, then returns true', () => {
    const song1 = new Song(validSong);
    const song2 = new Song(validSong);

    expect(song1.equals(song2)).toBe(true);
});

test('given two Song objects with different values, when equals is called, then returns false', () => {
    const song1 = new Song(validSong);
    const song2 = new Song({ ...validSong, title: "Another One Bites the Dust" });

    expect(song1.equals(song2)).toBe(false);
});

test('when id is set, then getId returns the correct value', () => {
    const song = new Song(validSong);

    expect(song.getId()).toEqual(1);
});

test('when id is not set, then getId returns undefined', () => {
    const song = new Song({ ...validSong, id: undefined });

    expect(song.getId()).toBeUndefined();
});

test('when getting title from Song, then the correct title is returned', () => {
    const song = new Song(validSong);

    expect(song.getTitle()).toEqual("Bohemian Rhapsody");
});

test('when getting genre from Song, then the correct genre is returned', () => {
    const song = new Song(validSong);

    expect(song.getGenre()).toEqual("Rock");
});

test('when creating Song from Prisma, then values are mapped correctly', () => {
    const prismaSong = {
        id: 1,
        title: "Bohemian Rhapsody",
        genre: "Rock",
    };

    const song = Song.from(prismaSong);

    expect(song.getId()).toEqual(1);
    expect(song.getTitle()).toEqual("Bohemian Rhapsody");
    expect(song.getGenre()).toEqual("Rock");
});
