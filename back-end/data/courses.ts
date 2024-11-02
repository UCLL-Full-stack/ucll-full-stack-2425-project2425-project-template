import { Course } from '../model/course';

const courses = [
    new Course({ id: 1, name: 'Introduction to Programming', description: 'Learn the basics of programming.', phase: 1, credits: 3, lecturers: ['Dr. Smith'], isElective: false, requiredPassedCourses: [] }),
    new Course({ id: 2, name: 'Data Structures', description: 'Study various data structures.', phase: 2, credits: 4, lecturers: ['Prof. Johnson'], isElective: false, requiredPassedCourses: [] }),
    new Course({ id: 3, name: 'Operating Systems', description: 'Understand the principles of operating systems.', phase: 3, credits: 3, lecturers: ['Dr. Brown'], isElective: false, requiredPassedCourses: [] }),
    new Course({ id: 4, name: 'Database Systems', description: 'Learn about database design and implementation.', phase: 2, credits: 3, lecturers: ['Dr. White'], isElective: true, requiredPassedCourses: [] }),
    new Course({ id: 5, name: 'Artificial Intelligence', description: 'Explore the concepts of artificial intelligence.', phase: 4, credits: 4, lecturers: ['Prof. Green'], isElective: true, requiredPassedCourses: [] }),
];

export default courses;