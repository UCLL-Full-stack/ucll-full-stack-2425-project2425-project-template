import { Group } from '../model/group';
import groupDb from '../repository/group.db';

const getAllGroups = (): Group[] => {
    return groupDb.getAllGroups();
};

const getGroupById = (id: number): Group => {
    const group = groupDb.getGroupById({id});
    if (!group) {
        throw new Error(`Group with id ${id} does not exist.`);
    }
    return group;
}

export default {
    getAllGroups,
    getGroupById,
};