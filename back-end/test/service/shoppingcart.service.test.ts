import shoppingcartDb from '../../repository/shoppingcart.db';
import shoppingcartService from '../../service/shoppingcart.service';
import { ShoppingcartInput } from '../../types';

let mockShoppingcartDbGetAllShoppingcarts: jest.Mock;

beforeEach(() => {
    mockShoppingcartDbGetAllShoppingcarts = jest.fn();
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
