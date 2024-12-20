import { describe, it, expect } from '@jest/globals';
import { Board } from '../../model/board';
import { User } from '../../model/user';
import { Guild } from '../../model/guild';
import { Column } from '../../model/column';
import { PermissionEntry, KanbanPermission, DiscordPermission } from '../../types';

describe('Board Model', () => {
    it('should create a Board instance with given properties', () => {
        const mockUser = new User(
            'user1',
            'TestUser',
            'TestGlobalName',
            'avatar.png',
            ['guild1']
        );

        const mockPermissionSettings: PermissionEntry[] = [{
            identifier: DiscordPermission.ADMINISTRATOR,
            kanbanPermission: [KanbanPermission.VIEW_BOARD],
            
        }];

        const mockGuild = new Guild(
            'guild1',
            'Test Guild', 
            'owner1',
            mockPermissionSettings,
            ['role1'],
            [{ userId: 'user1', roleIds: ['role1'] }],
            ['board1']
        );

        const mockColumns = [
            new Column('column1', 'Column 1', 0, [], 'board1')
        ];

        const mockPermissions: PermissionEntry[] = [
            {
                identifier: 'permission1',
                kanbanPermission: [
                    KanbanPermission.VIEW_BOARD,
                    KanbanPermission.EDIT_BOARD
                ]
            }
        ];

        const board = new Board(
            'board1',
            'Test Board',
            mockUser,
            mockGuild,
            mockColumns,
            mockPermissions
        );

        expect(board).toBeDefined();
        expect(board.getBoardId()).toBe('board1');
        expect(board.getBoardName()).toBe('Test Board');
        expect(board.getCreatedByUser()).toBe(mockUser);
        expect(board.getGuild()).toBe(mockGuild);
        expect(board.getColumns()).toEqual(mockColumns);
        expect(board.getPermissions()).toEqual(mockPermissions);
    });

    it('should throw an error if required properties are missing', () => {
        const mockUser = new User(
            'user1',
            'TestUser',
            'TestGlobalName',
            'avatar.png',
            ['guild1']
        );

        const mockPermissionSettings: PermissionEntry[] = [{
            identifier: DiscordPermission.ADMINISTRATOR,
            kanbanPermission: [KanbanPermission.VIEW_BOARD]
        }];

        const mockGuild = new Guild(
            'guild1',
            'Test Guild',
            'owner1',
            mockPermissionSettings,
            ['role1'],
            [{ userId: 'user1', roleIds: ['role1'] }],
            ['board1']
        );

        const mockColumns = [
            new Column('column1', 'Column 1', 0, [], 'board1')
        ];

        const mockPermissions: PermissionEntry[] = [
            {
                identifier: 'permission1',
                kanbanPermission: [KanbanPermission.VIEW_BOARD]
            }
        ];

        expect(() => new Board('', 'Test Board', mockUser, mockGuild, mockColumns, mockPermissions)).toThrowError('Board ID is required');
        expect(() => new Board('board1', '', mockUser, mockGuild, mockColumns, mockPermissions)).toThrowError('Board Name is required');
        expect(() => new Board('board1', 'Test Board', null as any, mockGuild, mockColumns, mockPermissions)).toThrowError('Created By User is required');
        expect(() => new Board('board1', 'Test Board', mockUser, null as any, mockColumns, mockPermissions)).toThrowError('Guild is required');
        expect(() => new Board('board1', 'Test Board', mockUser, mockGuild, [], mockPermissions)).toThrowError('Board must have at least one column');
        expect(() => new Board('board1', 'Test Board', mockUser, mockGuild, mockColumns, [])).toThrowError('Board must have permission settings');
    });
});