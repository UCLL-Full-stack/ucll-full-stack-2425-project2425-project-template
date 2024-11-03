import { Product } from '../model/product';

let productData: any;

beforeEach(() => {
    productData = {
        id: 1,
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        rating: 5
    };
});

afterEach(() => {
    productData = null;
});

test('given valid properties, when product is created, then product should have correct properties', () => {
    // given 
    // valid properties

    // when
    const product = new Product(productData);

    // then
    expect(product.getId()).toBe(productData.id);
    expect(product.getName()).toBe(productData.name);
    expect(product.getPrice()).toBe(productData.price);
    expect(product.getDescription()).toBe(productData.description);
    expect(product.getRating()).toBe(productData.rating);
});

test('given missing required properties, when product is created, then an error is thrown', () => {
    // given
    const invalidProductData = {
        name: '',
        price: 0,
        description: '',
        rating: 0
    };

    // when & then
    expect(() => new Product(invalidProductData)).toThrow();
});

test('given two identical products, when compared, then they should be equal', () => {
    // given
    const productData = {
        id: 2,
        name: 'Product 1',
        price: 100,
        description: 'Description 1',
        rating: 4
    };
    const productData2 = {
        id: 2,
        name: 'Product 1',
        price: 100,
        description: 'Description 1',
        rating: 4
    };

    const product1 = new Product(productData);
    const product2 = new Product(productData2);

    // when
    const areEqual = product1.equals(product2);

    // then
    expect(areEqual).toBe(true);
});
