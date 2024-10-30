import itemDb from '../../repository/item.db';
import nutritionlabelDb from '../../repository/nutritionlabel.db';
import itemService from '../../service/item.service';
import { ItemInput, NutritionlabelInput } from '../../types';

let createItemMock: jest.Mock;

let mockItemDbGetAllItems: jest.Mock;
let mockItemDbCreate: jest.Mock;

let mockItemDbGetById: jest.Mock;
let mockNutritionDbGetById: jest.Mock;

let addNutritionlabelToShoppingcartMock: jest.Mock;

beforeEach(() => {
    mockItemDbGetAllItems = jest.fn();
    mockItemDbCreate = jest.fn();
    createItemMock = jest.fn();

    mockItemDbGetById = jest.fn();
    mockNutritionDbGetById = jest.fn();

    addNutritionlabelToShoppingcartMock = jest.fn();
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

test('given: a valid nutritionlabel, when: adding nutritionlabel to a item, then: that nutritionlabel is set as the items nutritionlabel', () => {
    // given a valid nutritionlabel
    const nutritionlabel: NutritionlabelInput = {
        id: 0,
        energy: 100,
        fat: 0.3,
        saturatedFats: 0.1,
        carbohydrates: 27,
        sugar: 14,
        protein: 1.3,
        salts: 0.01,
    };

    const item: ItemInput = {
        id: 0,
        name: 'Tomato',
        price: 10,
        pathToImage: 'public/tomato.png',
        category: 'vegetables',
    };

    nutritionlabelDb.getById = mockNutritionDbGetById.mockReturnValue(nutritionlabel);
    itemDb.getById = mockItemDbGetById.mockReturnValue(item);

    itemDb.addNutritionlabelToItem = addNutritionlabelToShoppingcartMock;

    // when adding nutritionlabel to an item
    itemService.addNutritionlabelToItem({ nutritionlabelId: nutritionlabel.id, itemId: item.id });

    // then that item is set as the items nutritionlabel
    expect(addNutritionlabelToShoppingcartMock).toHaveBeenCalled();
    expect(addNutritionlabelToShoppingcartMock).toHaveBeenCalledWith({
        nutritionlabelId: nutritionlabel.id,
        itemId: item.id,
    });
});
