import { Driver } from '../../model/driver';
import { Racecar } from '../../model/racecar';
import { Crash } from '../../model/crash';

test('given: valid values for Driver, when: Driver is created, then: Driver is created with those values', () => {
    // given
    const name = 'Lewis Hamilton';
    const team = 'Mercedes';
    const description = 'A skilled driver';
    const age = 36;
    const racecar = new Racecar({
        car_name: 'Mercedes W12',
        type: 'Formula 1',
        description: 'A fast racecar',
        hp: 1000
    });
    const crash = new Crash({
        type: 'Collision',
        description: 'A severe crash',
        casualties: 5,
        deaths: 2
    });
    const id = 1;

    // when
    const driver = new Driver({ name, team, description, age, racecar, crash, id });

    // then
    expect(driver.getName()).toBe(name);
    expect(driver.getTeam()).toBe(team);
    expect(driver.getDescription()).toBe(description);
    expect(driver.getAge()).toBe(age);
    expect(driver.getRacecar()).toBe(racecar);
    expect(driver.getCrash()).toBe(crash);
    expect(driver.getId()).toBe(id);
});