import { Album } from '../../model/album';
import albumService from '../../service/albumService';
import albumDb from '../../repository/album.db';
import { Duration } from '../../types';
import { Artist } from '../../model/artist';

const albumId = 1;

const duration: Duration = { hours: 1, minutes: 15, seconds: 30 };
const releaseDate = new Date('2022-05-01');
const artist: Artist = new Artist({name: 'artist1'});

const mockAlbumData = {
    id: albumId,
    title: 'Mock Album',
    duration: duration,
    artists: [artist],
    songs: [],
    releaseDate: releaseDate,
};

const album = new Album(mockAlbumData);

let mockGetAlbums: jest.Mock;
let mockGetAlbumById: jest.Mock;

beforeEach(() => {
    mockGetAlbums = jest.fn();
    mockGetAlbumById = jest.fn();

    albumDb.getAlbums = mockGetAlbums;
    albumDb.getAlbumById = mockGetAlbumById;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Album Service', () => {

    test('when getAlbums is called, it should return a list of albums', () => {
        // given
        mockGetAlbums.mockReturnValue([album]);

        // when
        const result = albumService.getAlbums();

        // then
        expect(result).toEqual([album]);
        expect(albumDb.getAlbums).toHaveBeenCalledTimes(1);
    });

    test('when getAlbumById is called with a valid ID, it should return the album with that ID', () => {
        // given
        mockGetAlbumById.mockReturnValue(album);

        // when
        const result = albumService.getAlbumById(albumId);

        // then
        expect(result).toEqual(album);
        expect(albumDb.getAlbumById).toHaveBeenCalledWith(albumId);
        expect(albumDb.getAlbumById).toHaveBeenCalledTimes(1);
    });

    test('when getAlbumById is called with an invalid ID, it should throw an error', () => {
        // given
        const nonExistentAlbumId = 999;
        mockGetAlbumById.mockReturnValue(undefined);

        // when
        const callService = () => albumService.getAlbumById(nonExistentAlbumId);

        // then
        expect(callService).toThrow(`album with id ${nonExistentAlbumId} doesn't exist`);
        expect(albumDb.getAlbumById).toHaveBeenCalledWith(nonExistentAlbumId);
        expect(albumDb.getAlbumById).toHaveBeenCalledTimes(1);
    });
});

