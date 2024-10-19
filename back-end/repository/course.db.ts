import { Course } from '../model/course';
import courses from '../data/courses';


const findAll = (): Course[] => {
    try {
        return courses;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const findById = ({id}: {id : number}): Course | null => {
    try {
        return courses.find(course => course.id === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    findAll,
    findById,
};
