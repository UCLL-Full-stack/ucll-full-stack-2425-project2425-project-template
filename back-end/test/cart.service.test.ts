import cartService from '../service/cart.service';
import cartDb from '../repository/cart.db';
import productDb from '../repository/product.db';
import { Cart } from '../model/cart';
import { Product } from '../model/product';

jest.mock('../repository/cart.db');
jest.mock('../repository/product.db');

let product: Product;
let cart: Cart;

beforeEach(() => {
    product = new Product({ id: 1, name: 'Product 1', price: 100, description: 'Description 1', rating: 4 });
    cart = new Cart({ id: 1, products: [] });
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given carts in the database, when getAllCarts is called, then all carts are returned', () => {
    // given
    const carts = [cart, new Cart({ id: 2, products: [] })];
    (cartDb.getAllCarts as jest.Mock).mockReturnValue(carts);

    // when
    const result = cartService.getAllCarts();

    // then
    expect(result).toEqual(carts);
});

test('given a product and a cart, when putProductInCart is called, then the product is added to the cart', () => {
    // given
    (productDb.getAllproducts as jest.Mock).mockReturnValue([product]);
    (cartDb.getAllCarts as jest.Mock).mockReturnValue([cart]);
    (cartDb.putProductToCart as jest.Mock).mockReturnValue(cart);

    // when
    const result = cartService.putProductInCart({ id: 1, productId: 1 });

    // then
    expect(result).toEqual(cart);
});

test('given no cart in the database, when putProductInCart is called, then an error is returned', () => {
    // given
    (productDb.getAllproducts as jest.Mock).mockReturnValue([product]);
    (cartDb.getAllCarts as jest.Mock).mockReturnValue([]);

    // when
    const result = cartService.putProductInCart({ id: 999, productId: 1 });

    // then
    expect(result).toBe('Cart with ID 999 not found');
});

test('given no product in the database, when putProductInCart is called, then an error is returned', () => {
    // given
    (productDb.getAllproducts as jest.Mock).mockReturnValue([]);
    (cartDb.getAllCarts as jest.Mock).mockReturnValue([cart]);

    // when
    const result = cartService.putProductInCart({ id: 1, productId: 999 });

    // then
    expect(result).toBe('Product not found in the available products list.');
});
