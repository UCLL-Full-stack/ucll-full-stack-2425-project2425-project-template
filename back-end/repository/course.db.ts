import { Course } from '../model/course';
import courses from '../data/courses';

let DBcourses: Course[] = courses

const findAll = (): Course[] => {
    try {
        return DBcourses;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const findById = (id : number): Course | null => {
    try {
        return DBcourses.find(course => course.id === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const deleteCourses = (ids: number[]) : void => {
    try {
        DBcourses = DBcourses.filter(course => !ids.includes(course.id));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    findAll,
    findById,
    deleteCourses,
};
