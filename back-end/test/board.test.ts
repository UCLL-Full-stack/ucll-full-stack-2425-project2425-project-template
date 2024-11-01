
import { Board } from '../model/board';
import { User } from '../model/user';
import { Guild } from '../model/guild';
import { Column } from '../model/column';
import { KanbanPermission, PermissionEntry } from '../types';

describe('Board Entity', () => {
    let mockUser: User;
    let mockGuild: Guild;
    let mockColumns: Column[];
    let mockPermissions: PermissionEntry[];

    beforeEach(() => {
        mockUser = new User('user1', 'testUser', 'tag123', []);
        mockGuild = new Guild('guild1', 'Test Guild', [], [], []);
        mockColumns = [new Column('col1', 'Todo', [])];
        mockPermissions = [{
            identifier: 'user1',
            kanbanPermission: KanbanPermission.ADMINISTRATOR
        }];
    });

    test('should create valid board', () => {
        const board = new Board(
            'board1',
            'Test Board',
            mockUser,
            mockGuild,
            mockColumns,
            mockPermissions
        );

        expect(board.getBoardId()).toBe('board1');
        expect(board.getBoardName()).toBe('Test Board');
    });

    test('should throw error for invalid board name', () => {
        expect(() => {
            new Board(
                'board1',
                '',  // Invalid empty name
                mockUser,
                mockGuild,
                mockColumns,
                mockPermissions
            );
        }).toThrow('Board Name is required');
    });

    test('should throw error for missing columns', () => {
        expect(() => {
            new Board(
                'board1',
                'Test Board',
                mockUser,
                mockGuild,
                [],
                mockPermissions
            );
        }).toThrow('Board must have at least one column');
    });

    test('should throw error if view permission is not set', () => {
        expect(() => {
            new Board(
                'board1',
                'Test Board',
                mockUser,
                mockGuild,
                mockColumns,
                []  
            );
        }).toThrow('Board must have view permission set');
    });

    test('should properly add and remove columns', () => {
        const board = new Board(
            'board1',
            'Test Board',
            mockUser,
            mockGuild,
            mockColumns,
            mockPermissions
        );

        const newColumn = new Column('col2', 'In Progress', []);
        board.addColumn(newColumn);
        expect(board.getColumns().length).toBe(2);

        board.removeColumn('col2');
        expect(board.getColumns().length).toBe(1);
    });
});


// import request from 'supertest';
// import app from '../../back-end/app';

// describe('Board Creation API', () => {
//     test('should create board with valid data', async () => {
//         const response = await request(app)
//             .post('/api/boards')
//             .send({
//                 boardName: 'Test Board',
//                 guildId: 'guild1',
//                 userId: 'user1'
//             });

//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty('board');
//         expect(response.body.board.name).toBe('Test Board');
//     });

//     test('should reject invalid board creation request', async () => {
//         const response = await request(app)
//             .post('/api/boards')
//             .send({
//                 boardName: '',  // Invalid empty name
//                 guildId: 'guild1',
//                 userId: 'user1'
//             });

//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty('error');  });
// });