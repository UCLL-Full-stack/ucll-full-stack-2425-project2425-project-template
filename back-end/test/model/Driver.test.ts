import { Driver } from '../../model/Driver';

test('given: valid values for Driver, when: Driver is created, then: Driver is created with those values', () => {
    // given
    const name = 'Lewis';
    const surname = 'Hamilton';
    const birthdate = new Date('1985-01-07');
    const team = 'Mercedes';
    const country = 'United Kingdom';
    const description = 'A skilled driver';
    const id = 1;

    // when
    const driver = new Driver({ name, surname, birthdate, team, country, description, id });

    // then
    expect(driver.getName()).toBe(name);
    expect(driver.getSurname()).toBe(surname);
    expect(driver.getBirthdate()).toBe(birthdate);
    expect(driver.getTeam()).toBe(team);
    expect(driver.getCountry()).toBe(country);
    expect(driver.getDescription()).toBe(description);
});

test('given: missing name, when: Driver is created, then: an error is thrown', () => {
    // given
    const name = '';
    const surname = 'Hamilton';
    const birthdate = new Date('1985-01-07');
    const team = 'Mercedes';
    const country = 'United Kingdom';
    const description = 'A skilled driver';
    const id = 1;

    // when / then
    expect(() => new Driver({ name, surname, birthdate, team, country, description, id })).toThrowError('Name is required');
});

test('given: missing surname, when: Driver is created, then: an error is thrown', () => {
    // given
    const name = 'Lewis';
    const surname = '';
    const birthdate = new Date('1985-01-07');
    const team = 'Mercedes';
    const country = 'United Kingdom';
    const description = 'A skilled driver';
    const id = 1;

    // when / then
    expect(() => new Driver({ name, surname, birthdate, team, country, description, id })).toThrowError('Surname is required');
});

test('given: missing team, when: Driver is created, then: an error is thrown', () => {
    // given
    const name = 'Lewis';
    const surname = 'Hamilton';
    const birthdate = new Date('1985-01-07');
    const team = '';
    const country = 'United Kingdom';
    const description = 'A skilled driver';
    const id = 1;

    // when / then
    expect(() => new Driver({ name, surname, birthdate, team, country, description, id })).toThrowError('Team is required');
});

test('given: missing country, when: Driver is created, then: an error is thrown', () => {
    // given
    const name = 'Lewis';
    const surname = 'Hamilton';
    const birthdate = new Date('1985-01-07');
    const team = 'Mercedes';
    const country = '';
    const description = 'A skilled driver';
    const id = 1;

    // when / then
    expect(() => new Driver({ name, surname, birthdate, team, country, description, id })).toThrowError('Country is required');
});

test('given: missing description, when: Driver is created, then: an error is thrown', () => {
    // given
    const name = 'Lewis';
    const surname = 'Hamilton';
    const birthdate = new Date('1985-01-07');
    const team = 'Mercedes';
    const country = 'United Kingdom';
    const description = '';
    const id = 1;

    // when / then
    expect(() => new Driver({ name, surname, birthdate, team, country, description, id })).toThrowError('Description is required');
});