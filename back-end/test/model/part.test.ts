import { Part } from "../../model/part";

const name = 'Ryzen 5600X'
const brand = 'AMD'
const type = 'CPU'
const price = 150

test('given: valid values for part, when: part is created, then: part is created with those values', () => {
    // given

    // when
    const part = new Part({ name, brand, type, price });

    // then
    expect(part.getName()).toEqual(name);
    expect(part.getBrand()).toEqual(brand);
    expect(part.getType()).toEqual(type);
    expect(part.getPrice()).toEqual(price);
});


test('given: part name is empty, when: part is created, then: an error is thrown', () => {
    // given
    const emptyName = ''

    // when
    const part = () => new Part({ name: emptyName, brand, type, price });

    // then
    expect(part).toThrow('Name cannot be empty');
});

test('given: part brand is empty, when: part is created, then: an error is thrown', () => {
    // given
    const emptyBrand = ''

    // when
    const part = () => new Part({ name, brand: emptyBrand, type, price });

    // then
    expect(part).toThrow('Brand cannot be empty');
});

test('given: part type is empty, when: part is created, then: an error is thrown', () => {
    // given
    const emptyType = ''

    // when
    const part = () => new Part({ name, brand, type: emptyType, price });

    // then
    expect(part).toThrow('Type cannot be empty');
});

test('given: price is negative, when: part is created, then: an error is thrown', () => {
    // given
    const negativePrice = -50

    // when
    const part = () => new Part({ name, brand, type, price: negativePrice });

    // then
    expect(part).toThrow('Price must be positive and non zero');
});

test('given: price is zero, when: part is created, then: an error is thrown', () => {
    // given
    const zeroPrice = 0

    // when
    const part = () => new Part({ name, brand, type, price: zeroPrice });

    // then
    expect(part).toThrow('Price must be positive and non zero');
});