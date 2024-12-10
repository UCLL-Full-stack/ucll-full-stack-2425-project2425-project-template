import { Coach } from '../model/coach';
import coachDb from '../repository/coach.db';
import { CoachInput } from '../types';

const getAllCoaches = async (): Promise<Coach[]> => {
    return await coachDb.getAllCoaches();
};

const getCoachById = async (id: number): Promise<Coach> => {
    const coach = await coachDb.getCoachById(id);
    if (!coach) {
        throw new Error(`Coach with id ${id} does not exist.`);
    }
    return coach;
};

const createCoach = async (coachInput: CoachInput): Promise<Coach> => {
    const existingCoaches = (await coachDb.getAllCoaches()) || [];

    if (coachInput.id === undefined || coachInput.id < 0) {
        throw new Error('Invalid id.');
    }
    if (existingCoaches.find((coach) => coach.getId() === coachInput.id)) {
        throw new Error(`Coach with id ${coachInput.id} already exists.`);
    }
    if (!coachInput.firstName) {
        throw new Error('First name is required.');
    }
    if (!coachInput.lastName) {
        throw new Error('Last name is required.');
    }
    if (!coachInput.email) {
        throw new Error('Email is required.');
    }
    if (!coachInput.phoneNumber) {
        throw new Error('Phone number is required.');
    }

    const newCoach = new Coach(coachInput);
    return await coachDb.createCoach(newCoach);
};

export default { getAllCoaches, getCoachById, createCoach };
