import playlistService from "../service/playlist.service";
import playlistDb from "../repository/playlist.db";
import { Playlist } from "../model/playlist";
import songDb from "../repository/song.db";
import { Song } from "../model/song";

test('given: valid name and totalNumbers; when: createPlaylist is called; then: playlist is created successfully', () => {
    // Given
    const playlistInput = { name: "My Playlist", totalNumbers: 0, songs: [] };
    const createdPlaylist = new Playlist({ id: 1, ...playlistInput });
    const mockCreatePlaylist = jest.spyOn(playlistDb, "createPlaylist").mockReturnValue(createdPlaylist);

    // When
    const playlist = playlistService.createPlaylist(playlistInput);

    // Then
    expect(playlist.getName()).toEqual(playlistInput.name);
    expect(playlist.getId()).toBe(1);
    expect(playlist.getTotalNumbers()).toBe(playlistInput.totalNumbers);
    expect(playlist.getSongs()).toEqual([]);

});


test('given: existing playlist ID; when: getPlaylistById is called; then: returns the correct playlist', () => {
    // Given
     const playlistInput = { name: "My Playlist", totalNumbers: 0, songs: [] };
    const createdPlaylist = new Playlist({ id: 1, ...playlistInput });

    const validId = 1;
    jest.spyOn(playlistDb, "getPlaylistById").mockReturnValue(createdPlaylist);

    // When
    const result = playlistService.getPlaylistById({ id: validId });

    // Then
    expect(result?.getName()).toEqual("My Playlist");
    expect(result?.getId()).toEqual(validId);
});

test('given: valid playlist and song IDs; when: addSongToPlaylist is called; then: song is added successfully', () => {
    // Given
    const playlistId = 1;
    const songId = 1;
    const playlist = new Playlist({ id: playlistId, name: "My Playlist", totalNumbers: 0, songs: [] });
    const song = new Song({ id: songId, title: "New Song", genre: "Pop" });

    jest.spyOn(playlistDb, "getPlaylistById").mockReturnValue(playlist);
    jest.spyOn(songDb, "getSongById").mockReturnValue(song);

    const updatedPlaylist = new Playlist({
        id: playlistId,
        name: "My Playlist",
        totalNumbers: 1,
        songs: [song], 
    });

    jest.spyOn(playlistDb, "addSongToPlaylist").mockReturnValue(updatedPlaylist);

    // When
    const result =playlistService.addSongToPlaylist({ playlistId, songId });

    // Then
    expect(result?.getSongs()).toContain(song);
    expect(result?.getTotalNumbers()).toBe(1); // Ensure totalNumbers is updated correctly
});
