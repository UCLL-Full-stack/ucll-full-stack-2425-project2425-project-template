import { set } from 'date-fns';
import { User } from '../model/user';

test('given: valid values for a shopping cart, when: shopping cart is constructed, then: shopping cart is created with those values', () => {
    // given valid values for a user
    const validName = 'Groceries';
    const validDeliveryDate = set(new Date(), { hours: 12, minutes: 0 });

    // when user is constructed
    const shoppingcart = new Shoppingcart({
        name: validName,
        deliveryDate: validDeliveryDate,
    });

    // then user is created with those values
    expect(shoppingcart.getName()).toEqual(validName);
    expect(shoppingcart.getDeliveryDate()).toEqual(validDeliveryDate);
});

test('given: invalid name for a shopping cart, when: shopping cart is constructed, then: shopping cart is created with those values', () => {
    // given valid values for a user
    const invalidName = '';
    const validDeliveryDate = set(new Date(), { hours: 12, minutes: 0 });

    // when user is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: invalidName,
            deliveryDate: validDeliveryDate,
        });

    // then user is created with those values
    expect(shoppingcart).toThrow('');
});

test('given: invalid delivery date for a shopping cart, when: shopping cart is constructed, then: shopping cart is created with those values', () => {
    // given valid values for a user
    const validName = 'Groceries';
    const invalidDeliveryDate = set(new Date(Date.now() - 86400000), { hours: 12, minutes: 0 });

    // when user is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: validName,
            deliveryDate: invalidDeliveryDate,
        });

    // then user is created with those values
    expect(shoppingcart).toThrow('');
});

test('given: valid shopping cart, when: adding a user to a shopping cart that isnt already added, then: user is added to that shopping cart', () => {
    // given valid shopping cart
    const validName = 'Groceries';
    const validDeliveryDate = set(new Date(), { hours: 12, minutes: 0 });

    const user1 = new User({ email: 'john.doe@mail.com', password: 'JohnD123!', role: 'admin' });

    const shoppingcart = new Shoppingcart({ validName, validDeliveryDate });

    // when adding a user to a shopping cart that isnt already added
    shoppingcart.addUser(user1);

    // then user is added to that shopping cart
    expect(shoppingcart.getUsers()).toContain(user1);
    expect(shoppingcart.getUser()).toHaveLength(1);
});

test('given: valid shopping cart, when: adding a user to a shopping cart that is already added, then: error is thrown', () => {
    // given valid shopping cart
    const validName = 'Groceries';
    const validDeliveryDate = set(new Date(), { hours: 12, minutes: 0 });

    const user1 = new User({ email: 'john.doe@mail.com', password: 'JohnD123!', role: 'admin' });

    const shoppingcart = new Shoppingcart({ validName, validDeliveryDate });
    shoppingcart.addUser(user1);

    // when adding a user to a shopping cart that isnt already added
    const addUserToShoppingcart = () => shoppingcart.addUser(user1);

    // then user is added to that shopping cart
    expect(addUserToShoppingcart).toThrow('');
    expect(shoppingcart.getUsers()).toContain(user1);
    expect(shoppingcart.getUser()).toHaveLength(1);
});
