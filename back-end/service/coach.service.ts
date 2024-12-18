import coachDb from "../repository/coach.db";
import { CoachInput } from "../types/types";

const getAllcoaches = async () => {
    return coachDb.findAll();
}

const addCoach = async ({name, job}: CoachInput) => {
    return coachDb.addCoach({name, job, teamId: 1});
}

const updateCoach = async (id: number, {name, job}: CoachInput) => {
    return coachDb.updateCoach(id, {name, job});
}

const removeCoach = async (id: number) => {
    return coachDb.removeCoach(id);
}

export default { getAllcoaches, addCoach, updateCoach , removeCoach };