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

const getCourseById = (id: number): Course => {
    let res: Course | null = CourseRepository.findById({id: id});
    if (res === null) {
        throw new Error(`Course with id ${id} does not exist`);
    }
    return res;
}

export default {
    getAll,
    getAllShort,
    getCourseById,
};