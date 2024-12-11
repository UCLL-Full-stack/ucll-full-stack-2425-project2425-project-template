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