import { Admin } from '../model/admin';

export const admins = [
    new Admin({
        id: 1,
        username: 'admin',
        password: 'adminpassword'
    }),
];

const getAdminById = (id: number): Admin | undefined => {
    return admins.find(admin => admin.id === id);
}

const getAdminByUsername = async (username: string): Promise<Admin | null> => {
    return admins.find(admin => admin.username === username) || null;
};

export default { getAdminById, getAdminByUsername }