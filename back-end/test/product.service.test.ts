import productService from '../service/product.service';
import productDb from '../repository/product.db';
import { Product } from '../model/product';

jest.mock('../repository/product.db');

let products: Product[];
let product: Product;

beforeEach(() => {
    products = [
        new Product({ id: 1, name: 'Product 1', price: 100, description: 'Description 1', rating: 4 }),
        new Product({ id: 2, name: 'Product 2', price: 200, description: 'Description 2', rating: 5 })
    ];
    product = new Product({ id: 1, name: 'Product 1', price: 100, description: 'Description 1', rating: 4 });
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given products in the database, when getAllProducts is called, then all products are returned', () => {
    // given
    (productDb.getAllproducts as jest.Mock).mockReturnValue(products);

    // when
    const result = productService.getAllProducts();

    // then
    expect(result).toEqual(products);
});

test('given a product in the database, when getProductById is called, then the product is returned', () => {
    // given
    (productDb.getProductById as jest.Mock).mockReturnValue(product);

    // when
    const result = productService.getProductById({ id: 1 });

    // then
    expect(result).toEqual(product);
});

test('given no product in the database, when getProductById is called, then an error is thrown', () => {
    // given
    (productDb.getProductById as jest.Mock).mockReturnValue(null);

    // when & then
    expect(() => productService.getProductById({ id: 999 })).toThrow('Product with id 999 does not exist.');
});
