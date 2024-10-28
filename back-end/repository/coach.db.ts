import { Coach } from '../model/coach';

const coaches = [
    new Coach({
        id: 1,
        firstName: 'Jason',
        lastName: 'Bourne',
        email: 'jasonbourne@ucll.be',
        phoneNumber: '0423456789',
    }),
    new Coach({
        id: 2,
        firstName: 'James',
        lastName: 'Bond',
        email: 'jamesbond@ucll.be',
        phoneNumber: '0487654321',
    }),
];

const getAllCoaches = (): Coach[] => {
    return coaches;
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
