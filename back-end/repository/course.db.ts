import { Course } from '../model/course';
import courses from '../data/courses';
import tryCatcher from '../util/TryCatchWrapper';

let DBcourses: Course[] = courses;

const findAll = tryCatcher((): Course[] => {
    return DBcourses;
});

const findById = tryCatcher((id: number): Course | null => {
    return DBcourses.find(course => course.id === id) || null;
});

const findAllByRequiredCourseId = tryCatcher((id: number): Course[] => {
    return DBcourses.filter(course => course.requiredPassedCourses.some(requiredCourse => requiredCourse.id === id));
});

const deleteCourses = tryCatcher((ids: number[]): void => {
    DBcourses = DBcourses.filter(course => !ids.includes(course.id));
});

export default {
    findAll,
    findById,
    deleteCourses,
    findAllByRequiredCourseId,
};
