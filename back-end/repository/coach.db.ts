import { Coach } from '../model/coach';
import database from './database';

const getAllCoaches = async (): Promise<Coach[]> => {
    try {
        const coachPrisma = await database.coach.findMany({
            include: { teams: true }
        });
        return coachPrisma.map((coachPrisma) => Coach.from(coachPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCoachById = (id: number): Coach | undefined => {
    try {
        return coaches.find((coach) => coach.getId() === id) || undefined;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createCoach = (coach: Coach): Coach => {
    coaches.push(coach);
    return coach;
};

export default { getAllCoaches, getCoachById, createCoach };
