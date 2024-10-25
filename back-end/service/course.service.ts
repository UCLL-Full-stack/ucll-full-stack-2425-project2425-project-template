import { Course } from '../model/course';
import { ISP } from '../model/isp';
import CourseRepository from '../repository/course.db';
import ISPService from './isp.service';
import StudentService from './student.service';
import CourseShortView from '../types/courseShortView';
import { Student } from '../model/student';

const getAll = () : Course[] => {
    return CourseRepository.findAll();
}

const getAllShort = () : CourseShortView[] => {
    return CourseRepository.findAll().map((course:any) => {
        return new CourseShortView(course);
    });
}

const getCourseById = (id: number): Course => {
    let res: Course | null = CourseRepository.findById(id);
    if (res === null) {
        throw new Error(`Course with id ${id} does not exist`);
    }
    return res;
}

const deleteCourses = (ids: number[]) : String => {
    ids.forEach(id => {
        throwErrorIfNotExist(id);
        throwErrorIfRequiredInIsp(id);
        throwErrorIfPassedByStudent(id);
        throwErrorIfRequiredByCourse(id);
    });
    CourseRepository.deleteCourses(ids);
    return "Courses are successfully deleted";
}

const throwErrorIfNotExist = (id: number) : void => {
    let res: Course | null = CourseRepository.findById(id);
    if (res === null) {
        throw new Error(`Course with id ${id} does not exist`);
    }
}

const throwErrorIfRequiredInIsp = (id: number) : void => {
    let res: ISP[] = ISPService.getAllByCourseId(id);
    if (res.length > 0) {
        throw new Error(`Course with id ${id} is required in ISP`);
    }
}

const throwErrorIfPassedByStudent = (id: number) : void => {
    let res: Student[] = StudentService.getAllByPassedCourseId(id);
    if (res.length > 0) {
        throw new Error(`Course with id ${id} is passed by student`);
    }
}

const throwErrorIfRequiredByCourse = (id: number) : void => {
    let res: Course[] = CourseRepository.findAllByRequiredCourseId(id);
    if (res.length > 0) {
        throw new Error(`Course with id ${id} is required by course`);
    }
}

export default {
    getAll,
    getAllShort,
    getCourseById,
    deleteCourses,
};

