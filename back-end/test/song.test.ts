// import songService from "../service/song.service";
// import songDb from "../repository/song.db";
// import { Song } from "../model/song";

// test("given valid song input; when createSong is called; then it creates and returns the song", () => {
//     // Given
//     const songInput = { title: "New Song", genre: "Pop" };
//     const createdSong = new Song({ title: songInput.title, genre: songInput.genre });
//     jest.spyOn(songDb, "createSong").mockReturnValue(createdSong);
//     // When
//     const result = songService.createSong(songInput);
//     // Then
//     expect(result).toBeInstanceOf(Song);
//     expect(result.getTitle()).toBe("New Song");
//     expect(result.getGenre()).toBe("Pop");
// });

// test("given songs in database; when getAllSongs is called; then it returns an array of songs", () => {
//     // Given
//     const songs = [
//         new Song({ title: "Song 1", genre: "Rock" }),
//         new Song({ title: "Song 2", genre: "Jazz" }),
//     ];
//     jest.spyOn(songDb, "getAllSongs").mockReturnValue(songs);
//     // When
//     const result = songService.getAllSongs();
//     // Then
//     expect(result).toHaveLength(2);
//     expect(result[0]).toBeInstanceOf(Song);
//     expect(result[0].getTitle()).toBe("Song 1");
//     expect(result[1].getGenre()).toBe("Jazz");
// });

// test("given valid song ID; when getSongById is called; then it returns the song", () => {
//     // Given
//     const songId = 1;
//     const song = new Song({ id: songId, title: "My Song", genre: "Pop" });

//     jest.spyOn(songDb, "getSongById").mockReturnValue(song);

//     // When
//     const result = songService.getSongById({ id: songId });

//     // Then
//     expect(result).toBeInstanceOf(Song);
//     expect(result?.getTitle()).toBe("My Song");
// });

// test("given invalid song ID; when getSongById is called; then it throws an error", () => {
//     // Given
//     const songId = 99;
//     jest.spyOn(songDb, "getSongById").mockReturnValue(null);

//     // Then
//     expect(() => {
//         songService.getSongById({ id: songId });
//     }).toThrow(`User with id ${songId} does not exist`);
// });
