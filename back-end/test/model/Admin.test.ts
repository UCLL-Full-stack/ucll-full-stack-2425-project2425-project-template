import { Admin } from '../../model/Admin';

test('given: valid values for Admin, when: Admin is created, then: Admin is created with those values', () => {
    // given
    const username = 'adminuser';
    const password = 'adminpassword';
    const id = 1;

    // when
    const admin = new Admin(username, password, id);

    // then
    expect(admin.getUsername()).toBe(username);
    expect(admin.getPassword()).toBe(password);
    expect(admin.getId()).toBe(id);
});