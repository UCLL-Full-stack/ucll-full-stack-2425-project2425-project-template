import { Cart } from '../../model/cart';

test('given: valid values; when: creating a cart; then: cart is created with those values.', () => {
    // GIVEN 
    const id: number = 8872523;
    const total_price: number = 50;
    const customer_id: number = 522567;

    // WHEN
    const cart: Cart = new Cart({ id, total_price, customer_id });

    // THEN
    expect(cart.getId()).toEqual(id);
    expect(cart.getTotal_price()).toEqual(total_price);
    expect(cart.getCustomer_id()).toEqual(customer_id);

});