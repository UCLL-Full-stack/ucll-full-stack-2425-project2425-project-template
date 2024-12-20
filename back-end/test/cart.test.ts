import { Cart } from '../model/cart';
import { Product } from '../model/product';

let product1: Product;
let product2: Product;
let cartData: any;

beforeEach(() => {
    product1 = new Product({
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Description 1',
        rating: 4
    });

    product2 = new Product({
        id: 2,
        name: 'Product 2',
        price: 200,
        description: 'Description 2',
        rating: 5
    });

    cartData = {
        id: 1,
        products: [product1, product2]
    };
});

afterEach(() => {
    // Reset the cartData to its initial state
    cartData.products = [];
});

test('given valid properties, when cart is created, then cart should have correct properties', () => {
    // when
    const cart = new Cart(cartData);

    // then
    expect(cart.getId()).toBe(cartData.id);
    expect(cart.getProducts()).toEqual(cartData.products);
    expect(cart.getTotalPrice()).toBe(300);
});

test('given multiple products, when cart is created, then total price should be calculated correctly', () => {
    // when
    const cart = new Cart(cartData);

    // then
    expect(cart.getTotalPrice()).toBe(300);
});

test('given two identical carts, when compared, then they should be equal', () => {
    // given
    const cartData2 = {
        id: 2,
        products: [product1, product2]
    };

    const cart1 = new Cart(cartData);
    const cart2 = new Cart(cartData2);

    // when
    const areEqual = cart1.equals(cart2);

    // then
    expect(areEqual).toBe(true);
});
