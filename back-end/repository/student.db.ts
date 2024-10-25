import {Student} from '../model/student';
import students from '../data/students';

let DBstudents: Student[] = students;

const findAllByPassedCourseId = (id: number): Student[] => {
    return DBstudents.filter(student => student.passedCourses.some(course => course.id === id));
}

export default {
    findAllByPassedCourseId,
};