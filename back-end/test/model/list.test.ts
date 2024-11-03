import { List } from '../../model/list';
import { Album } from '../../model/album';
import { Duration } from '../../types';
import { Artist } from '../../model/artist';

const mockAlbum: Album = new Album({
  id: 1,
  title: 'Sample Album',
  duration: { hours: 0, minutes: 45, seconds: 30 } as Duration,
  artists: [new Artist({name: 'artist1'})],
  songs: [],
  releaseDate: new Date('2023-01-01'),
});

describe('List Class', () => {
  let list: List;
  let identicalList: List;

  beforeEach(() => {
    list = new List({
      id: 1,
      title: 'Favorite Albums',
      description: 'A list of my favorite albums',
      albums: [mockAlbum],
    });

    identicalList = new List({
      id: 1,
      title: 'Favorite Albums',
      description: 'A list of my favorite albums',
      albums: [mockAlbum],
    });
  });

  test('should create a list instance with given properties', () => {
    expect(list.getId()).toBe(1);
    expect(list.getTitle()).toBe('Favorite Albums');
    expect(list.getDescription()).toBe('A list of my favorite albums');
    expect(list.getAlbums()).toEqual([mockAlbum]);
    expect(list.getCreatedAt()).toBeLessThanOrEqual(Date.now());
  });

  test('should throw an error if title or description is empty', () => {
    expect(() => {
      new List({
        title: '',
        description: '',
        albums: [mockAlbum],
      });
    }).toThrow('title and description cannot be empty');
  });

  test('should throw an error if albums array is empty', () => {
    expect(() => {
      new List({
        title: 'No Albums',
        description: 'This list has no albums',
        albums: [],
      });
    }).toThrow('list albums cannot be empty');
  });

  test('should retrieve the list title', () => {
    expect(list.getTitle()).toBe('Favorite Albums');
  });

  test('should retrieve the list description', () => {
    expect(list.getDescription()).toBe('A list of my favorite albums');
  });

  test('should retrieve the list of albums', () => {
    expect(list.getAlbums()).toEqual([mockAlbum]);
  });

  test('should retrieve the created timestamp', () => {
    expect(typeof list.getCreatedAt()).toBe('number');
  });

  test('should return true when comparing two identical lists', () => {
    expect(list.equals(list)).toBe(true);
  });

  test('should return false when comparing two different lists', () => {
    const differentList = new List({
      title: 'Different List',
      description: 'A different description',
      albums: [mockAlbum],
    });

    expect(list.equals(differentList)).toBe(false);
  });
});

