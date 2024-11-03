import { Role } from "../../model/role";
import { DiscordPermission } from "../../types";

describe('Role Model', () => {
    let role: Role;

    beforeEach(() => {
        role = new Role('role1', 'Admin', []);
    });

    test('should create a valid role', () => {
        expect(role.getRoleId()).toBe('role1');
        expect(role.getRoleName()).toBe('Admin');
    });

    test('should add a permission to the role', () => {
        role.addPermission(DiscordPermission.MANAGE_CHANNELS);
        expect(role.getPermissions().length).toBe(1);
        expect(role.hasPermission(DiscordPermission.MANAGE_CHANNELS)).toBe(true);
    });

    test('should throw error when adding duplicate permission', () => {
        role.addPermission(DiscordPermission.MANAGE_CHANNELS);
        expect(() => {
            role.addPermission(DiscordPermission.MANAGE_CHANNELS);
        }).toThrow('Permission Manage Channels already exists for this role.');
    });

    test('should remove a permission from the role', () => {
        role.addPermission(DiscordPermission.MANAGE_CHANNELS);
        role.removePermission(DiscordPermission.MANAGE_CHANNELS);
        expect(role.getPermissions().length).toBe(0);
    });

    test('should throw error when removing a non-existing permission', () => {
        expect(() => {
            role.removePermission(DiscordPermission.MANAGE_CHANNELS);
        }).toThrow('Permission Manage Channels does not exist for this role.');
    });

    test('should validate the role ID and name', () => {
        expect(() => {
            new Role('', 'Admin', []);
        }).toThrow('Role ID is required');
        expect(() => {
            new Role('role1', '', []);
        }).toThrow('Role Name is required');
    });
});
