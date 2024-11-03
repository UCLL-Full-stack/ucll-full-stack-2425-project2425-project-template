import { Album } from '../../model/album';
import { Artist } from '../../model/artist';
import { Duration } from '../../types';

const mockDuration: Duration = { hours: 1, minutes: 20, seconds: 30 };
const mockArtists: Artist[] = [
    new Artist({ name: 'artist1' }),
    new Artist({ name: 'artist2' })
];
const mockReleaseDate = new Date('2023-01-01');

describe('Album Class', () => {
    let albumInstance: Album;
    let identicalAlbumInstance: Album;

    beforeEach(() => {
        albumInstance = new Album({
            id: 1,
            title: 'Test Album',
            duration: mockDuration,
            artists: mockArtists,
            songs: [],
            releaseDate: mockReleaseDate,
        });

        identicalAlbumInstance = new Album({
            id: 1,
            title: 'Test Album',
            duration: mockDuration,
            artists: mockArtists,
            songs: [],
            releaseDate: mockReleaseDate,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create an album instance with provided properties', () => {
        expect(albumInstance.getId()).toBe(1);
        expect(albumInstance.getTitle()).toBe('Test Album');
        expect(albumInstance.getDuration()).toEqual(mockDuration);
        expect(albumInstance.getArtists()).toEqual(mockArtists);
        expect(albumInstance.getReleaseDate()).toEqual(mockReleaseDate);
    });

    test('should throw an error if title is empty', () => {
        expect(() => {
            new Album({
                title: '',
                duration: mockDuration,
                artists: mockArtists,
                releaseDate: mockReleaseDate,
                songs: [],
            });
        }).toThrow('album title cannot be empty');
    });

    test('should throw an error if duration is missing', () => {
        expect(() => {
            new Album({
                title: 'Test Album',
                duration: undefined as unknown as Duration, // simulate missing duration
                artists: mockArtists,
                releaseDate: mockReleaseDate,
                songs: [],
            });
        }).toThrow('album duration cannot be empty');
    });

    test('should throw an error if no artists are provided', () => {
        expect(() => {
            new Album({
                title: 'Test Album',
                duration: mockDuration,
                artists: [],
                releaseDate: mockReleaseDate,
                songs: [],
            });
        }).toThrow('album must have at least 1 artist');
    });

    test('should throw an error if release date is missing', () => {
        expect(() => {
            new Album({
                title: 'Test Album',
                duration: mockDuration,
                artists: mockArtists,
                releaseDate: undefined as unknown as Date, // simulate missing release date
                songs: [],
            });
        }).toThrow('release date cannot be empty');
    });

    test('should return the album title', () => {
        expect(albumInstance.getTitle()).toBe('Test Album');
    });

    test('should return the album duration', () => {
        expect(albumInstance.getDuration()).toEqual(mockDuration);
    });

    test('should return the list of artists', () => {
        expect(albumInstance.getArtists()).toEqual(mockArtists);
    });

    test('should return the release date', () => {
        expect(albumInstance.getReleaseDate()).toEqual(mockReleaseDate);
    });

    test('should return true for equal album instances', () => {
        expect(albumInstance.equals(identicalAlbumInstance)).toBe(true);
    });

    test('should return false for different album instances', () => {
        const differentAlbumInstance = new Album({
            id: 2,
            title: 'Different Album',
            duration: { hours: 0, minutes: 45, seconds: 20 },
            artists: [new Artist({ name: 'differentArtist' })],
            songs: [],
            releaseDate: new Date('2022-05-05'),
        });

        expect(albumInstance.equals(differentAlbumInstance)).toBe(false);
    });
});
