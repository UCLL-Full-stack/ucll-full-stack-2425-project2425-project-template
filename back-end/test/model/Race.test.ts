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

test('given: missing name, when: Race is created, then: an error is thrown', () => {
    // given
    const raceData = {
        name: '',
        type: 'Formula 1',
        description: 'A high-speed race',
        location: 'Monaco',
        date: new Date('2021-05-23'),
        crashes: []
    };

    // when / then
    expect(() => new Race(raceData)).toThrowError('Name is required');
});

test('given: missing type, when: Race is created, then: an error is thrown', () => {
    // given
    const raceData = {
        name: 'Grand Prix',
        type: '',
        description: 'A high-speed race',
        location: 'Monaco',
        date: new Date('2021-05-23'),
        crashes: []
    };

    // when / then
    expect(() => new Race(raceData)).toThrowError('Type is required');
});

test('given: missing description, when: Race is created, then: an error is thrown', () => {
    // given
    const raceData = {
        name: 'Grand Prix',
        type: 'Formula 1',
        description: '',
        location: 'Monaco',
        date: new Date('2021-05-23'),
        crashes: []
    };

    // when / then
    expect(() => new Race(raceData)).toThrowError('Description is required');
});

test('given: missing location, when: Race is created, then: an error is thrown', () => {
    // given
    const raceData = {
        name: 'Grand Prix',
        type: 'Formula 1',
        description: 'A high-speed race',
        location: '',
        date: new Date('2021-05-23'),
        crashes: []
    };

    // when / then
    expect(() => new Race(raceData)).toThrowError('Location is required');
});