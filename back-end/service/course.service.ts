import { Course } from '../model/course';
import CourseRepository from '../repository/course.db';
import CourseShortView from '../types/courseShortView';

const getAll = () : Course[] => {
    return CourseRepository.findAll();
}

const getAllShort = () : CourseShortView[] => {
    return CourseRepository.findAll().map(course => {
        return new CourseShortView(course);
    });
}

export default {
    getAll,
    getAllShort
};