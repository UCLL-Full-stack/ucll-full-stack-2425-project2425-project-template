import itemDb from '../../repository/item.db';
import shoppingcartDb from '../../repository/shoppingcart.db';
import shoppingcartService from '../../service/shoppingcart.service';
import { ShoppingcartInput } from '../../types';
import { ItemInput } from '../../types';

// Mocking shoppingcartDb to get all shoppingcarts
let mockShoppingcartDbGetAllShoppingcarts: jest.Mock;

// Mocking itemDb to get an item by id
let mockItemDbGetById: jest.Mock;

// Mocking shoppingcartDb to get a shoppingcart by id
let mockShoppingcartDbGetById: jest.Mock;

// Mocking shoppingcartDb to add an item to a shoppingcart
let addItemToShoppingcartMock: jest.Mock;

// Mocking shoppingcartDb to create a shoppingcart
let mockShoppingcartDbCreate: jest.Mock;

beforeEach(() => {
    mockShoppingcartDbGetAllShoppingcarts = jest.fn();
    mockItemDbGetById = jest.fn();
    mockShoppingcartDbGetById = jest.fn();
    addItemToShoppingcartMock = jest.fn();
    mockShoppingcartDbCreate = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a filled shoppingcartDb, when: getting all shoppingcarts from shoppingcartService, then: all shoppingcarts are returned', () => {
    // given a filled shoppingcartDb
    const shoppingcart1: ShoppingcartInput = {
        name: 'fruit-shopping',
        deliveryDate: new Date('2025-12-24'),
    };

    const shoppingcarts: ShoppingcartInput[] = [shoppingcart1];

    shoppingcartDb.getAll = mockShoppingcartDbGetAllShoppingcarts.mockReturnValue(shoppingcarts);

    // when getting all shoppingcarts from userService
    shoppingcartService.getAllShoppingcarts();

    // then all shoppingcarts are returned
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveBeenCalled();
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveReturnedWith(shoppingcarts);
});

test('given: a valid shoppingcart, when: creating a new shoppingcart, then: the shoppingcart is created', () => {
    // given a valid shoppingcart
    const shoppingcart1: ShoppingcartInput = {
        name: 'fruit-shopping',
        deliveryDate: new Date('2025-12-24'),
    };

    shoppingcartDb.create = mockShoppingcartDbCreate.mockReturnValue(shoppingcart1);

    // when creating a new shoppingcart
    shoppingcartService.createShoppingcart(shoppingcart1);

    // then the shoppingcart is created
    expect(mockShoppingcartDbCreate).toHaveBeenCalled();
    expect(mockShoppingcartDbCreate).toHaveBeenCalledWith(expect.objectContaining(shoppingcart1));
});

test('given: a valid item, when: adding the item to a shoppingcart, then: the item is added to the shoppingcart', () => {
    // given a valid item
    const item1: ItemInput = {
        id: 1,
        name: 'Banana',
        price: 0.49,
        pathToImage: '/images/banana.png',
        category: 'fruits',
    };

    const shoppingcart1: ShoppingcartInput = {
        id: 1,
        name: 'Shoppingcart 1',
        deliveryDate: new Date('2027-10-10'),
    };

    itemDb.getById = mockItemDbGetById.mockReturnValue(item1);
    shoppingcartDb.getById = mockShoppingcartDbGetById.mockReturnValue(shoppingcart1);

    shoppingcartDb.addItemToShoppingcart = addItemToShoppingcartMock;

    // when adding the item to a shoppingcart
    shoppingcartService.addItemToShoppingcart({
        itemId: item1.id!,
        shoppingcartId: shoppingcart1.id!,
    });

    // then the item is added to the shoppingcart
    expect(addItemToShoppingcartMock).toHaveBeenCalled();
    expect(addItemToShoppingcartMock).toHaveBeenCalledWith({
        item: item1,
        shoppingcart: shoppingcart1,
    });
});
