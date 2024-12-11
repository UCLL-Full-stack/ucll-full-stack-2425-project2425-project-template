import { Racecar } from '../../model/Racecar';

test('given: valid values for Racecar, when: Racecar is created, then: Racecar is created with those values', () => {
    // given
    const name = 'SF21';
    const type = 'Formula 1';
    const brand = 'Ferrari';
    const hp = 1000;
    const id = 1;

    // when
    const racecar = new Racecar({ name, type, brand, hp, id });

    // then
    expect(racecar.getName()).toBe(name);
    expect(racecar.getType()).toBe(type);
    expect(racecar.getBrand()).toBe(brand);
    expect(racecar.getHp()).toBe(hp);
    expect(racecar.getId()).toBe(id);
});