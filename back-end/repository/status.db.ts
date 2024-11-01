import { Status } from '../model/status';

const statuses: Status[] = [];

const getAllStatuss = (): Status[] => {
    return statuses;
};

const getStatusById = ({ id }: { id: number }): Status | null => {
    const status = statuses.find((status) => status.getId() === id);
    if (!status) {
        return null;
    }
    return status;
}

export default {
    getAllStatuss,
    getStatusById,
};
