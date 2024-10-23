import { Coach } from '../model/coach';
import coachDb from '../repository/coach.db';

const getAllCoaches = (): Coach[] => {
    return coachDb.getAllCoaches();
};

const getCoachById = (id: number): Coach | undefined => {
    if (!coachDb.getCoachById(id)) {
        throw new Error(`Coach with id ${id} does not exist.`);
    }
    return coachDb.getCoachById(id);
};

export default { getAllCoaches, getCoachById };
