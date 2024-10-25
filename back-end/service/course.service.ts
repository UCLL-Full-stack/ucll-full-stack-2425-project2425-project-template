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
        throw new Error(`Course with id ${id} does not exist`);
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
        if (courseId === id) throw new Error("Course cannot require itself");
        let course: Course = getCourseById(courseId);
        requiredCourses.push(course);
    });

    if (currentCourse.phase !== courseUpdateInfo.phase
        || currentCourse.credits !== courseUpdateInfo.credits) {
            let errorMessage = "Course's phase or credits cannot be changed, because it is chosen in ISP";
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
        throw new Error(`Course with id ${id} does not exist`);
    }
}

const throwErrorIfExist = (name: string, phase: number) : void => {
    let res: Course | null = CourseRepository.findByNameAndPhase(name, phase);
    if (res !== null) {
        throw new Error(`Course with name ${name} and semester ${phase} already exists`);
    }
}

const throwErrorIfChosenInIsp = (id: number, errorMessage?: string) : void => {
    let res: ISP[] = ISPService.getAllByCourseId(id);
    if (res.length > 0) {
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        throw new Error(`Course with id ${id} is chosen in ISP`);
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
    updateCourse,
    deleteCourses,
};

