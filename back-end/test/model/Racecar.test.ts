import { Racecar } from '../../model/racecar';

test('given: valid values for Racecar, when: Racecar is created, then: Racecar is created with those values', () => {
    // given
    const car_name = 'Ferrari SF21';
    const type = 'Formula 1';
    const description = 'A fast racecar';
    const hp = 1000;
    const id = 1;

    // when
    const racecar = new Racecar({ car_name, type, description, hp, id });

    // then
    expect(racecar.getCarName()).toBe(car_name);
    expect(racecar.getType()).toBe(type);
    expect(racecar.getDescription()).toBe(description);
    expect(racecar.getHp()).toBe(hp);
    expect(racecar.getId()).toBe(id);
});