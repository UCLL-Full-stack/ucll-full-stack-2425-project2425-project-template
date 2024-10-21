import { set } from 'date-fns';
import { Shoppingcart } from '../model/shoppingcart';

test('given: valid values for a shopping cart, when: shopping cart is constructed, then: shopping cart is created with those values', () => {
    // given valid values for a shopping cart
    const validName = 'Groceries';
    const validDeliveryDate = set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 });

    // when shopping cart is constructed
    const shoppingcart = new Shoppingcart({
        name: validName,
        deliveryDate: validDeliveryDate,
    });

    // then shopping cart is created with those values
    expect(shoppingcart.getName()).toEqual(validName);
    expect(shoppingcart.getDeliveryDate()).toEqual(validDeliveryDate);
    expect(shoppingcart.getUser()).toBeUndefined();
});

test('given: invalid name for a shopping cart, when: shopping cart is constructed, then: error is thrown', () => {
    // given invalid name for a shopping cart
    const invalidName = '';
    const validDeliveryDate = set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 });

    // when shopping cart is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: invalidName,
            deliveryDate: validDeliveryDate,
        });

    // then error is thrown
    expect(shoppingcart).toThrow('Name is required');
});

test('given: invalid delivery date for a shopping cart, when: shopping cart is constructed, then: error is thrown', () => {
    // given invalid delivery date for a shopping cart
    const validName = 'Groceries';
    const invalidDeliveryDate = new Date('Invalid Date');

    // when shopping cart is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: validName,
            deliveryDate: invalidDeliveryDate,
        });

    // then error is thrown
    expect(shoppingcart).toThrow('Delivery date is required');
});

test('given: delivery date before today for a shopping cart, when: shopping cart is constructed, then: error is thrown', () => {
    // given delivery date before today for a shopping cart
    const validName = 'Groceries';
    const invalidDeliveryDate = set(new Date(Date.now() - 86400000), { hours: 12, minutes: 0 });

    // when shopping cart is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: validName,
            deliveryDate: invalidDeliveryDate,
        });

    // then error is thrown
    expect(shoppingcart).toThrow('Delivery date should be after today');
});
