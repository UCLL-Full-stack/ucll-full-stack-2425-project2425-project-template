import { set } from 'date-fns';
import { User } from '../model/user';
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
    expect(shoppingcart.getUsers()).toHaveLength(0);
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

test('given: valid shopping cart, when: adding a user to a shopping cart that isnt already added, then: user is added to that shopping cart', () => {
    // given valid shopping cart
    const validName = 'Groceries';
    const validDeliveryDate = set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 });

    const user1 = new User({ email: 'john.doe@mail.com', password: 'JohnD123!', role: 'admin' });

    const shoppingcart = new Shoppingcart({ name: validName, deliveryDate: validDeliveryDate });

    // when adding a user to a shopping cart that isnt already added
    shoppingcart.addUserToShoppingCart(user1);

    // then user is added to that shopping cart
    expect(shoppingcart.getUsers()).toContain(user1);
    expect(shoppingcart.getUsers()).toHaveLength(1);
});

test('given: valid shopping cart, when: adding a user to a shopping cart that is already added, then: error is thrown and user is not added', () => {
    // given valid shopping cart
    const validName = 'Groceries';
    const validDeliveryDate = set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 });

    const user1 = new User({ email: 'john.doe@mail.com', password: 'JohnD123!', role: 'admin' });

    const shoppingcart = new Shoppingcart({ name: validName, deliveryDate: validDeliveryDate });
    shoppingcart.addUserToShoppingCart(user1);

    // when adding a user to a shopping cart that is already added
    const addUserToShoppingCartToShoppingcart = () => shoppingcart.addUserToShoppingCart(user1);

    // then error is thrown and user is not added
    expect(addUserToShoppingCartToShoppingcart).toThrow('This user is already added to Groceries');
    expect(shoppingcart.getUsers()).toContain(user1);
    expect(shoppingcart.getUsers()).toHaveLength(1);
});
