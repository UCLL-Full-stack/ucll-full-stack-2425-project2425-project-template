import { Admin } from '../model/Admin';

export const admins = [
    new Admin({
        id: 1,
        username: 'John Doe',
        password: 'Super Admin'
    }),
];

const getAdminById = (id: number): Admin | undefined => {
    return admins.find(admin => admin.getId() === id);
}

export default { getAdminById }