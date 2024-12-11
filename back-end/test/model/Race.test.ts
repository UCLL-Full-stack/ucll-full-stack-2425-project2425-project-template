import { Race } from '../../model/Race';
import { Crash } from '../../model/Crash';

test('given: valid values for Race, when: Race is created, then: Race is created with those values', () => {
    // given
    const name = 'Grand Prix';
    const type = 'Formula 1';
    const description = 'A high-speed race';
    const location = 'Monaco';
    const date = new Date('2021-05-23');
    const crash = new Crash({
        type: 'Collision',
        description: 'A severe crash',
        casualties: 5,
        deaths: 2
    });
    const crashes = [ crash ];
    const id = 1;

    // when
    const race = new Race({ name, type, description, location, date, crashes, id });

    // then
    expect(race.getName()).toBe(name);
    expect(race.getType()).toBe(type);
    expect(race.getDescription()).toBe(description);
    expect(race.getLocation()).toBe(location);
    expect(race.getDate()).toBe(date);
    expect(race.getCrashes()).toEqual(crashes);
    expect(race.getId()).toBe(id);
});