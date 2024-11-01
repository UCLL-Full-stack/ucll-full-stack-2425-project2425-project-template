import { Group } from '../model/group';

const groups: Group[] = [];

const getAllGroups = (): Group[] => {
    return groups;
};

const getGroupById = ({ id }: { id: number }): Group | null => {
    const group = groups.find((group) => group.getId() === id);
    if (!group) {
        return null;
    }
    return group;
}

export default {
    getAllGroups,
    getGroupById,
};
