import itemDb from '../../repository/item.db';
import itemService from '../../service/item.service';
import { ItemInput } from '../../types';

let mockItemDbGetAllItems: jest.Mock;
let mockItemDbCreate: jest.Mock;

beforeEach(() => {
    mockItemDbGetAllItems = jest.fn();
    mockItemDbCreate = jest.fn();
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

test('given: an a valid item, when: creating a item, then: the item is created and returned', () => {
    // given a valid item
    const item: ItemInput = {
        name: 'Tomato',
        price: 10,
        pathToImage: 'public/tomato.png',
        category: 'vegetables',
    };

    // when adding an item to the itemDb
    const createdItem = itemService.createItem(item);

    // then the item is added
    expect(mockItemDbCreate).toHaveBeenCalled();
    expect(mockItemDbCreate).toHaveBeenCalledWith(item);
    expect(createdItem).toEqual(item);
});
