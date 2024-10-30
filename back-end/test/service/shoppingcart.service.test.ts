import shoppingcartDb from '../../repository/shoppingcart.db';
import shoppingcartService from '../../service/shoppingcart.service';
import { ShoppingcartInput } from '../../types';
import { ItemInput } from '../../types';

let mockShoppingcartDbGetAllShoppingcarts: jest.Mock;
let mockShoppingcartDbAddItem: jest.Mock;

beforeEach(() => {
    mockShoppingcartDbGetAllShoppingcarts = jest.fn();
    mockShoppingcartDbAddItem = jest.fn();
});

test('given: a filled shoppingcartDb, when: getting all shoppingcarts from shoppingcartService, then: all shoppingcarts are returned', () => {
    // given a filled shoppingcartDb
    const shoppingcart1: ShoppingcartInput = {
        name: 'fruit-shopping',
        deliveryDate: new Date('2025-12-24'), // Ensure delivery date is in the future
    };

    const shoppingcarts: ShoppingcartInput[] = [shoppingcart1];

    shoppingcartDb.getAll = mockShoppingcartDbGetAllShoppingcarts.mockReturnValue(shoppingcarts);

    // when getting all shoppingcarts from userService
    shoppingcartService.getAllShoppingcarts();

    // then all shoppingcarts are returned
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveBeenCalled();
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveReturnedWith(shoppingcarts);
});

test('given: a valid item, when: adding the item to a shoppingcart, then: the item is added to the shoppingcart', () => {
    // given a valid item
    const item1: ItemInput = {
        name: 'Banana',
        price: 0.49,
        pathToImage: '/images/banana.png',
        category: 'fruits',
    };

    const shoppingcart1: ShoppingcartInput = {
        name: 'Shoppingcart 1',
        deliveryDate: new Date('2027-10-10'),
    };

    shoppingcartDb.addItem = mockShoppingcartDbAddItem.mockReturnValue(shoppingcart1);

    // when adding the item to a shoppingcart
    shoppingcartService.addItemToShoppingcart(item1, shoppingcart1);

    expect(mockShoppingcartDbAddItem).toHaveBeenCalled();
    expect(mockShoppingcartDbAddItem).toHaveBeenCalledWith(item1, shoppingcart1);
});
