import { Guild } from "../../model/guild";
import { Role } from "../../model/role";
import { PermissionEntry, Member } from "../../types";


describe('Guild Model', () => {
    let guild: Guild;

    beforeEach(() => {
        const settings: PermissionEntry[] = [];
        const roles: Role[] = [];
        const members: Member[] = [];
        guild = new Guild('guild1', 'Guild 1', settings, roles, members);
    });

    test('should create a valid guild', () => {
        expect(guild.getGuildId()).toBe('guild1');
        expect(guild.getGuildName()).toBe('Guild 1');
    });

    test('should add a role to the guild', () => {
        const role = new Role('role1', 'Admin', []);
        guild.addRole(role);
        expect(guild.getRoles().length).toBe(1);
    });

    test('should remove a role from the guild', () => {
        const role = new Role('role1', 'Admin', []);
        guild.addRole(role);
        guild.removeRole('role1');
        expect(guild.getRoles().length).toBe(0);
    });

    test('should throw error when removing non-existing role', () => {
        expect(() => {
            guild.removeRole('non-existing-role');
        }).toThrow('Role not found');
    });
});
