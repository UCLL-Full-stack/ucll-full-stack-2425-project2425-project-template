import { Cart } from '../../model/cart';

// Q&A Do we have to write given when then with colons and semi-colons? A: Doesn't matter as long as it's clear.
test('given: valid values; when: creating a cart; then: cart is created with those values.', () => {
    // GIVEN 
    const id: number = 8872523;
    const total_price: number = 50;
    const customer_id: number = 522567;

    // WHEN
    const cart: Cart = new Cart({ id, totalPrice: total_price, customerId: customer_id });

    // THEN
    expect(cart.getId()).toEqual(id);
    expect(cart.getTotalPrice()).toEqual(total_price);
    expect(cart.getCustomerId()).toEqual(customer_id);

});