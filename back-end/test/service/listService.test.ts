import { List } from '../../model/list';
import { Album } from '../../model/album';
import listService from '../../service/listService';
import listDb from '../../repository/list.db';
import albumDb from '../../repository/album.db';
import { ListInput } from '../../types';
import { Artist } from '../../model/artist';

const mockAlbums = [
    new Album({
        id: 1,
        title: 'Mock Album 1',
        duration: { hours: 1, minutes: 10, seconds: 0 },
        artists: [new Artist({name: 'artist1'})],
        songs: [],
        releaseDate: new Date('2022-01-01')
    }),
    new Album({
        id: 2,
        title: 'Mock Album 2',
        duration: { hours: 0, minutes: 50, seconds: 30 },
        artists: [new Artist({name: 'artist2'})],
        songs: [],
        releaseDate: new Date('2022-02-01')
    })
];

const mockListInput: ListInput = {
    title: 'My Favorite Albums',
    description: 'A list of my favorite albums',
    albums: [1, 2]
};

const mockList = new List({
    title: 'My Favorite Albums',
    description: 'A list of my favorite albums',
    albums: mockAlbums
});

let getAllListsMock: jest.Mock;
let getAlbumByIdMock: jest.Mock;
let createListMock: jest.Mock;

beforeEach(() => {
    getAllListsMock = jest.fn();
    getAlbumByIdMock = jest.fn();
    createListMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('List Service', () => {

    describe('getLists', () => {
        test('should return all lists', () => {
            // Given
            listDb.getAllLists = getAllListsMock.mockReturnValue([mockList]);

            // When
            const lists = listService.getLists();

            // Then
            expect(listDb.getAllLists).toHaveBeenCalled();
            expect(lists).toEqual([mockList]);
        });
    });

    describe('createList', () => {

        test('should create a list with valid albums', () => {
            // Given
            albumDb.getAlbumById = getAlbumByIdMock
            .mockImplementation((id) => mockAlbums.find((album) => album.getId() === id));
            listDb.createList = createListMock.mockReturnValue(mockList);

            // When
            const result = listService.createList(mockListInput);

            // Then
            expect(albumDb.getAlbumById).toHaveBeenCalledWith(1);
            expect(albumDb.getAlbumById).toHaveBeenCalledWith(2);
            expect(listDb.createList).toHaveBeenCalledWith(expect.any(List));
            expect(result).toEqual(mockList);
        });

        test('should throw an error if no albums are provided', () => {
            // Given
            const invalidListInput: ListInput = {
                title: 'Empty Album List',
                description: 'A list without albums',
                albums: []
            };

            // Then
            expect(() => listService.createList(invalidListInput)).toThrow('a list must have at least 1 album');
        });

        test('should throw an error if any album does not exist', () => {
            // Given
            albumDb.getAlbumById = getAlbumByIdMock.mockReturnValueOnce(undefined);

            // Then
            expect(() => listService.createList(mockListInput)).toThrow("album with id 1 doesn't exist'");
        });
    });
});
