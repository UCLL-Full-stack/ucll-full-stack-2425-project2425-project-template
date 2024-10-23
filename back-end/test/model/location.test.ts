import { Location } from '../../model/location';

test('Given valid location when making new location then location is created', () => {
    const location = new Location({
        street: 'Parkstraat',
        number: 12,
        city: 'Brussels',
        country: 'Belgium',
    });
    expect(location.getStreet()).toEqual('Parkstraat');
    expect(location.getNumber()).toEqual(12);
    expect(location.getCity()).toEqual('Brussels');
    expect(location.getCountry()).toEqual('Belgium');
});

test('Given empty street when making new location then error is thrown', () => {
    expect(() => {
        const location = new Location({
            street: '',
            number: 12,
            city: 'Brussels',
            country: 'Belgium',
        });
    }).toThrow('Street is required.');
});

test('Given empty number when making new location then error is thrown', () => {
    expect(() => {
        const location = new Location({
            street: 'Parkstraat',
            number: 0,
            city: 'Brussels',
            country: 'Belgium',
        });
    }).toThrow('Number is required.');
});

test('Given empty city when making new location then error is thrown', () => {
    expect(() => {
        const location = new Location({
            street: 'Parkstraat',
            number: 12,
            city: '',
            country: 'Belgium',
        });
    }).toThrow('City is required.');
});

test('Given empty country when making new location then error is thrown', () => {
    expect(() => {
        const location = new Location({
            street: 'Parkstraat',
            number: 12,
            city: 'Brussels',
            country: '',
        });
    }).toThrow('Country is required.');
});
