import { Race } from '../../model/Race';

test('given: valid values for Race, when: Race is created, then: Race is created with those values', () => {
    // given
    const name = 'Grand Prix';
    const type = 'Formula 1';
    const description = 'A high-speed race';
    const location = 'Monaco';
    const id = 1;

    // when
    const race = new Race(name, type, description, location, id);

    // then
    expect(race.getName()).toBe(name);
    expect(race.getType()).toBe(type);
    expect(race.getDescription()).toBe(description);
    expect(race.getLocation()).toBe(location);
    expect(race.getId()).toBe(id);
});