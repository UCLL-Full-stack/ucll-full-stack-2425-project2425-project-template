import itemDb from '../../repository/item.db';
import nutritionlabelDb from '../../repository/nutritionlabel.db';
import itemService from '../../service/item.service';
import { ItemInput, NutritionlabelInput } from '../../types';

let mockItemDbGetAllItems: jest.Mock;
let mockItemDbCreate: jest.Mock;
let createItemMock: jest.Mock;
let mockItemDbGetById: jest.Mock;
let mockNutritionlabelDbCreate: jest.Mock;

beforeEach(() => {
    mockItemDbGetAllItems = jest.fn();
    mockItemDbCreate = jest.fn();
    createItemMock = jest.fn();
    mockItemDbGetById = jest.fn();
    mockNutritionlabelDbCreate = jest.fn();
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

    itemDb.create = createItemMock.mockReturnValue(item);

    // when adding an item to the itemDb
    itemService.createItem(item);

    // then the item is added
    expect(createItemMock).toHaveBeenCalled();
    expect(createItemMock).toHaveBeenCalledWith(item);
});

test('given: a valid nutritionlabel, when: adding a nutritionlabel to a item, then: the nutritionlabel is added to the item and the item is returned', () => {
    // given a valid nutritionlabel
    const item: ItemInput = {
        name: 'Tomato',
        price: 10,
        pathToImage: 'public/tomato.png',
        category: 'vegetables',
    };

    const nutritionlabel: NutritionlabelInput = {
        energy: 100,
        fat: 0.3,
        saturatedFats: 0.1,
        carbohydrates: 27,
        sugar: 14,
        protein: 1.3,
        salts: 0.01,
    };

    itemDb.getById = mockItemDbGetById.mockReturnValue(item);
    nutritionlabelDb.create = mockNutritionlabelDbCreate.mockReturnValue(item);

    // when adding a nutritionlabel to a item
    itemService.addNutritionLabelToItem(item.id, nutritionlabel);

    // then the nutritionlabel is added to the item and the item is returned
    expect(mockNutritionlabelDbCreate).toHaveBeenCalled();
    expect(mockNutritionlabelDbCreate).toHaveBeenCalledWith(item.id, nutritionlabel);
});
