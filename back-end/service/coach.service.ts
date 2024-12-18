import { Coach } from "../model/coach";
import coachDb from "../repository/coach.db";
import { CoachInput } from "../types/types";

const getAllcoaches = async () => {
    return coachDb.findAll();
}

const addCoach = async ({name, job, imageUrl}: CoachInput) => {
    return coachDb.addCoach({name, job, imageUrl});
}

const removeCoach = async (id: number) => {
    return coachDb.removeCoach(id);
}

const updateCoach = async ( id: number ,{name, job, imageUrl}: CoachInput): Promise<Coach> => {
    return coachDb.updateCoach(id, {name, job, imageUrl});
}


export default { getAllcoaches, addCoach, removeCoach, updateCoach };