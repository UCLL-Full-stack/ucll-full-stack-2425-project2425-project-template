import { Build } from "../../model/build";
import { Part } from "../../model/part";

const part1 = new Part({ name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150})
const part2 = new Part({ name: 'RTX 3060', brand: 'NVIDIA', type: 'GPU', price: 200})
const part3 = new Part({ name: '990 PRO', brand: 'Samsung', type: 'SSD', price: 100})

const parts = [part1, part2, part3]
const price = 600
const preBuild = true

test('given: valid values for build, when: build is created, then: build is created with those values', () => {
    // given

    // when
    const build = new Build({ parts, price, preBuild });

    // then
    expect(build.getParts()).toEqual(parts);
    expect(build.getPrice()).toEqual(price);
    expect(build.getPreBuild()).toEqual(preBuild);
});

test('given: build empty parts array, when: build is created, then: an error is thrown', () => {
    // given
    const emptyParts: never[] = [];

    // when
    const build = () => new Build({ parts: emptyParts, price, preBuild });

    // then
    expect(build).toThrow('Build must have parts');
});

test('given: build with a negative price, when: build is created, then: an error is thrown', () => {
    // given
    const negativePrice = -600;

    // when
    const build = () => new Build({ parts, price: negativePrice, preBuild });

    // then
    expect(build).toThrow('Build must have positive and non zero price');
});

test('given: build with a price of zero, when: build is created, then: an error is thrown', () => {
    // given
    const zeroPrice = 0;

    // when
    const build = () => new Build({ parts, price: zeroPrice, preBuild });

    // then
    expect(build).toThrow('Build must have positive and non zero price');
});