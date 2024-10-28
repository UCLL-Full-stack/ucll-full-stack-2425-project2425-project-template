import { Item } from '../../model/item';

let mockItemDbGetAllItems: jest.Mock;

beforeEach(() => {
    mockItemDbGetAllItems = jest.fn();
});

test('given: a filled itemDb, when: getting all items from itemService, then: all items are returned', () => {
    // given a filled userDB
    const items: Item[] = [
        new Item({
            name: 'Banana',
            price: 10,
            pathToImage: 'public/banana.png',
            category: 'fruits',
        }),
    ];

    itemDb.getAll = mockItemDbGetAllItems.mockReturnValue(items);

    // when getting all users from userService
    itemService.getAllFruits();

    // then all users are returned
    expect(mockItemDbGetAllItems).toHaveBeenCalled();
    expect(mockItemDbGetAllItems).toHaveReturnedWith(items);
});
