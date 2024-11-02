import { Player } from '../../model/player';
import { User } from '../../model/user';

const testUser = new User({
    name: 'test',
    email: 'test@email.be',
    password: 'password',
    birthday: new Date(2005, 10, 20),
});

test('given: valid values for player, when: player is created, then: player is created with those values', () => {
    // given, when
    const testPlayer = new Player({
        id: 1,
        name: 'Tester',
        statistics: 'hp: 20 - power: 8000',
        class: 'Programmer',
        currency: 20,
        user: testUser,
    });

    // then
    expect(testPlayer.getId()).toEqual(1);
    expect(testPlayer.getName()).toEqual('Tester');
    expect(testPlayer.getStatistics()).toEqual('hp: 20 - power: 8000');
    expect(testPlayer.getClass()).toEqual('Programmer');
    expect(testPlayer.getCurrency()).toEqual(20);
    expect(testPlayer.getUser()).toEqual(testUser);
});
