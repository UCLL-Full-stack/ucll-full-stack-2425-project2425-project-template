import { Shoppingcart } from '../../model/shoppingcart';
import shoppingcartDb from '../../repository/shoppingcart.db';
import shoppingcartService from '../../service/shoppingcart.service';

let mockShoppingcartDbGetAllShoppingcarts: jest.Mock;

beforeEach(() => {
    mockShoppingcartDbGetAllShoppingcarts = jest.fn();
});

test('given: a filled shoppingcartDb, when: getting all shoppingcarts from shoppingcartService, then: all shoppingcarts are returned', () => {
    // given a filled shoppingcartDb
    const shoppingcarts: Shoppingcart[] = [
        new Shoppingcart({
            name: 'fruit-shopping',
            deliveryDate: new Date('2025-12-24'), // Ensure delivery date is in the future
        }),
    ];

    shoppingcartDb.getAll = mockShoppingcartDbGetAllShoppingcarts.mockReturnValue(shoppingcarts);

    // when getting all shoppingcarts from userService
    shoppingcartService.getAllShoppingcarts();

    // then all shoppingcarts are returned
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveBeenCalled();
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveReturnedWith(shoppingcarts);
});
