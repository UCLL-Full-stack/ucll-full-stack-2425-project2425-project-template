import { Admin } from '../model/admin';
import database from '../util/database';

const getAdminById = async ({ id }: { id: number }): Promise<Admin | null> => {
    try {
        const adminPrisma = await database.admin.findFirst({
            where: { id },
        });
        return adminPrisma ? Admin.from(adminPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}

const getAdminByUsername = async ({ username }: { username: string }): Promise<Admin | null> => {
    try {
        const adminPrisma = await database.admin.findFirst({
        where: { username },
      });
      return adminPrisma ? Admin.from(adminPrisma) : null;
    } catch (error) {
      console.error(error);
      throw new Error('Database error. See server logs for details.');
    }
}

export default { getAdminById, getAdminByUsername }