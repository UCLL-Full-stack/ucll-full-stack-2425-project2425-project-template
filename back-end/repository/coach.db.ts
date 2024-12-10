import { Coach } from '../model/coach';
import database from './database';

const getAllCoaches = async (): Promise<Coach[]> => {
    try {
        const coachPrisma = await database.coach.findMany({
            include: { team: true }
        });
        return coachPrisma.map((coach) => Coach.from(coach));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCoachById = async (id: number): Promise<Coach> => {
    try {
        const coachPrisma = await database.coach.findUnique({
            where: { id },
            include: { team: true }
        });
        if (!coachPrisma) {
            throw new Error('Coach not found');
        }
        return Coach.from(coachPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createCoach = async (coach: Coach): Promise<Coach> => {
    try {
        const coachPrisma = await database.coach.create({
            data: {
                firstName: coach.getFirstName(),
                lastName: coach.getLastName(),
                email: coach.getEmail(),
                phoneNumber: coach.getPhoneNumber()
            }
        });
        return Coach.from(coachPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default { getAllCoaches, getCoachById, createCoach };
