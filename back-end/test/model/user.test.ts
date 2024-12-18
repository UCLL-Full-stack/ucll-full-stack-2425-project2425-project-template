import { Guild } from "../../model/guild";
import { User } from "../../model/user";


describe('User Model', () => {
    let user: User;
    let guild: Guild;

    beforeEach(() => {
        guild = new Guild('guild1', 'Guild 1', [], [], []);
        user = new User('user1', 'Alice', 'alice#1234', [guild]);
    });

    test('should create a valid user', () => {
        expect(user.getUserId()).toBe('user1');
        expect(user.getUsername()).toBe('Alice');
    });

    test('should add a guild to the user', () => {
        const newGuild = new Guild('guild2', 'Guild 2', [], [], []);
        user.addGuild(newGuild);
        expect(user.getGuilds().length).toBe(2);
    });

    test('should remove a guild from the user', () => {
        user.removeGuild('guild1');
        expect(user.getGuilds().length).toBe(0);
    });

    test('should throw error when removing non-existing guild', () => {
        expect(() => {
            user.removeGuild('non-existing-guild');
        }).toThrow('Guild not found');
    });
});
