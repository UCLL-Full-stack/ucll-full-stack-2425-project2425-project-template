import { Driver } from '../../model/Driver';

test('given: valid values for Driver, when: Driver is created, then: Driver is created with those values', () => {
    // given
    const name = 'Lewis Hamilton';
    const team = 'Mercedes';
    const description = 'A skilled driver';
    const age = 36;
    const id = 1;

    // when
    const driver = new Driver(name, team, description, age, id);

    // then
    expect(driver.getName()).toBe(name);
    expect(driver.getTeam()).toBe(team);
    expect(driver.getDescription()).toBe(description);
    expect(driver.getAge()).toBe(age);
    expect(driver.getId()).toBe(id);
});