import AuthService from '../../service/Auth.Service';
import userDb from '../../repository/User.db';
import bcrypt from 'bcrypt';
import { User } from '../../model/User';

test('given missing username, when validateLoginInput is called, then it throws an error', async () => {
    // given
    const username = '';
    const password = 'password123';
    const role = 'user';

    // when / then
    await expect(AuthService.validateLoginInput(username, password, role)).rejects.toThrowError('Username, password, and role are required');
});

test('given missing password, when validateLoginInput is called, then it throws an error', async () => {
    // given
    const username = 'testuser';
    const password = '';
    const role = 'user';

    // when / then
    await expect(AuthService.validateLoginInput(username, password, role)).rejects.toThrowError('Username, password, and role are required');
});

test('given missing role, when validateLoginInput is called, then it throws an error', async () => {
    // given
    const username = 'testuser';
    const password = 'password123';
    const role = '';

    // when / then
    await expect(AuthService.validateLoginInput(username, password, role)).rejects.toThrowError('Username, password, and role are required');
});