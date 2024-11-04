import { Admin } from '../model/Admin';

export const admins = [
    new Admin({
        id: 1,
        username: 'admin',
        password: 'adminpassword'
    }),
];

const getAdminById = (id: number): Admin | undefined => {
    return admins.find(admin => admin.getId() === id);
}

const getAdminByUsername = async (username: string): Promise<Admin | null> => {
    return admins.find(admin => admin.getUsername() === username) || null;
};

export default { getAdminById, getAdminByUsername }