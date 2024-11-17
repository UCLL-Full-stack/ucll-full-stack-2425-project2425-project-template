import { Status } from '../model/status';
import statusDb from '../repository/status.db';

const getAllStatuses = async (): Promise<Status[]> => {
    return await statusDb.getAllStatuses();
};

const getStatusById = async (id: number): Promise<Status> => {
    const status = await statusDb.getStatusById({id});
    return status;
}

export default {
    getAllStatuses,
    getStatusById,
};