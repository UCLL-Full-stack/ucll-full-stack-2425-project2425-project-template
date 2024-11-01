import { Status } from '../model/status';
import statusDb from '../repository/status.db';

const getAllStatuses = (): Status[] => {
    return statusDb.getAllStatuss();
};

const getStatusById = (id: number): Status => {
    const status = statusDb.getStatusById({id});
    if (!status) {
        throw new Error(`Status with id ${id} does not exist.`);
    }
    return status;
}

export default {
    getAllStatuses,
    getStatusById,
};