import { Course } from '../model/course';
import courses from '../data/courses';
import tryCatcher from '../util/tryCatchWrapper';

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

const findByNameAndPhase = tryCatcher((name: string, phase: number): Course | null => {
    return DBcourses.find(course => course.name === name && course.phase === phase) || null;
});

const deleteCourses = tryCatcher((ids: number[]): void => {
    DBcourses = DBcourses.filter(course => course.id && !ids.includes(course.id));
});

const save = tryCatcher((course: Course): Course => {
    const index = DBcourses.findIndex(c => c.id === course.id);
    if (index === -1) {
        DBcourses.push(course);
        return course;
    }
    DBcourses[index] = course;
    return course;
});

export default {
    findAll,
    findById,
    findAllByRequiredCourseId,
    findByNameAndPhase,
    save,
    deleteCourses,
};
