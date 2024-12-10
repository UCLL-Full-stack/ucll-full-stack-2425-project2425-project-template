import { Race } from '../../model/race';
import { Driver } from '../../model/Driver';
import { Racecar } from '../../model/Racecar';
import { Crash } from '../../model/crash';
import { Admin } from '../../model/admin';

test('given: valid values for Race, when: Race is created, then: Race is created with those values', () => {
    // given
    const name = 'Grand Prix';
    const type = 'Formula 1';
    const description = 'A high-speed race';
    const location = 'Monaco';
    const driver = new Driver({
        name: 'Lewis Hamilton',
        team: 'Mercedes',
        description: 'A skilled driver',
        age: 36,
        racecar: new Racecar({
            car_name: 'Mercedes W12',
            type: 'Formula 1',
            description: 'A fast racecar',
            hp: 1000
        }),
        crash: new Crash({
            type: 'Collision',
            description: 'A severe crash',
            casualties: 5,
            deaths: 2
        })
    });
    const drivers = [driver];
    const crashes = [driver.getCrash()];
    const admin = new Admin({ username: 'adminuser', password: 'adminpassword' });
    const id = 1;

    // when
    const race = new Race({ name, type, description, location, drivers, crashes, admin, id });

    // then
    expect(race.getName()).toBe(name);
    expect(race.getType()).toBe(type);
    expect(race.getDescription()).toBe(description);
    expect(race.getLocation()).toBe(location);
    expect(race.getDrivers()).toEqual(drivers);
    expect(race.getCrashes()).toEqual(crashes);
    expect(race.getAdmin()).toBe(admin);
    expect(race.getId()).toBe(id);
});