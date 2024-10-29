import itemDb from '../../repository/item.db';
import itemService from '../../service/item.service';
import { ItemInput } from '../../types';

let mockItemDbGetAllItems: jest.Mock;

beforeEach(() => {
    mockItemDbGetAllItems = jest.fn();
});

test('given: a filled itemDb, when: getting all items from itemService, then: all items are returned', () => {
    // given a filled userDB
    const item1: ItemInput = {
        name: 'Banana',
        price: 10,
        pathToImage: 'public/banana.png',
        category: 'fruits',
    };

    const items: ItemInput[] = [item1];

    itemDb.getAll = mockItemDbGetAllItems.mockReturnValue(items);

    // when getting all users from userService
    itemService.getAllItems();

    // then all users are returned
    expect(mockItemDbGetAllItems).toHaveBeenCalled();
    expect(mockItemDbGetAllItems).toHaveReturnedWith(items);
});
