import { Course } from '../model/course';
import { ISP } from '../model/isp';
import CourseRepository from '../repository/course.db';
import ISPService from './isp.service';
import StudentService from './student.service';
import CourseShortView from '../types/courseShortView';
import { Student } from '../model/student';
import { CourseUpdateView } from '../types/courseUpdateView';

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
        throw new Error(ERROR_COURSE_NOT_EXIST(id));
    }
    return res;
}

const deleteCourses = (ids: number[]) : String => {
    ids.forEach(id => {
        throwErrorIfNotExist(id);
        throwErrorIfChosenInIsp(id);
        throwErrorIfPassedByStudent(id);
        throwErrorIfRequiredByCourse(id);
    });
    CourseRepository.deleteCourses(ids);
    return "Courses are successfully deleted";
}

const updateCourse = (id: number, courseUpdateInfo: CourseUpdateView) : Course => {
    let currentCourse = getCourseById(id);
    throwErrorIfExist(courseUpdateInfo.name, courseUpdateInfo.phase);

    let requiredCourses: Course[] = [];
    courseUpdateInfo.requiredPassedCourses.forEach(courseId => {
        if (courseId === id) throw new Error(ERROR_COURSE_REQUIRE_ITSELF);
        let course: Course = getCourseById(courseId);
        requiredCourses.push(course);
    });

    if (currentCourse.phase !== courseUpdateInfo.phase
        || currentCourse.credits !== courseUpdateInfo.credits) {
            let errorMessage = ERROR_COURSE_PHASE_CREDITS_CHANGE;
        throwErrorIfChosenInIsp(id, errorMessage);
    }

    let course = new Course({
        id: id,
        name: courseUpdateInfo.name,
        description: courseUpdateInfo.description,
        phase: courseUpdateInfo.phase,
        credits: courseUpdateInfo.credits,
        lecturers: courseUpdateInfo.lecturers,
        isElective: courseUpdateInfo.isElective,
        requiredPassedCourses: requiredCourses
    });

    return CourseRepository.save(course);
}

const throwErrorIfNotExist = (id: number) : void => {
    let res: Course | null = CourseRepository.findById(id);
    if (res === null) {
        throw new Error(ERROR_COURSE_NOT_EXIST(id));
    }
}

const throwErrorIfExist = (name: string, phase: number) : void => {
    let res: Course | null = CourseRepository.findByNameAndPhase(name, phase);
    if (res !== null) {
        throw new Error(ERROR_COURSE_EXIST(name, phase));
    }
}

const throwErrorIfChosenInIsp = (id: number, errorMessage?: string) : void => {
    let res: ISP[] = ISPService.getAllByCourseId(id);
    if (res.length > 0) {
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        throw new Error(ERROR_COURSE_CHOSEN_IN_ISP(id));
    }
}

const throwErrorIfPassedByStudent = (id: number) : void => {
    let res: Student[] = StudentService.getAllByPassedCourseId(id);
    if (res.length > 0) {
        throw new Error(ERROR_COURSE_PASSED_BY_STUDENT(id));
    }
}

const throwErrorIfRequiredByCourse = (id: number) : void => {
    let res: Course[] = CourseRepository.findAllByRequiredCourseId(id);
    if (res.length > 0) {
        throw new Error(ERROR_COURSE_REQUIRED_BY_COURSE(id));
    }
}

const ERROR_COURSE_NOT_EXIST = (id: number) => `Course with id ${id} does not exist`;
const ERROR_COURSE_EXIST = (name: string, phase: number) => `Course with name ${name} and semester ${phase} already exists`;
const ERROR_COURSE_CHOSEN_IN_ISP = (id: number) => `Course with id ${id} is chosen in ISP`;
const ERROR_COURSE_PASSED_BY_STUDENT = (id: number) => `Course with id ${id} is passed by student`;
const ERROR_COURSE_REQUIRED_BY_COURSE = (id: number) => `Course with id ${id} is required by course`;
const ERROR_COURSE_REQUIRE_ITSELF = "Course cannot require itself";
const ERROR_COURSE_PHASE_CREDITS_CHANGE = "Course's phase or credits cannot be changed, because it is chosen in ISP";

export default {
    getAll,
    getAllShort,
    getCourseById,
    updateCourse,
    deleteCourses,
};

export const errorMessages = {
    ERROR_COURSE_NOT_EXIST,
    ERROR_COURSE_EXIST,
    ERROR_COURSE_CHOSEN_IN_ISP,
    ERROR_COURSE_PASSED_BY_STUDENT,
    ERROR_COURSE_REQUIRED_BY_COURSE,
    ERROR_COURSE_REQUIRE_ITSELF,
    ERROR_COURSE_PHASE_CREDITS_CHANGE
};
