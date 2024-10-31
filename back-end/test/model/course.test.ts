import { Course } from "../../model/course";


test('given: valid values for course, when: course is created, then: course is created with those values', () => {
    // when
    const createdCourse = new Course({
        id: 1,
        name: 'Full-stack development',
        description: 'Learn how to develop a full-stack app',
        phase: 2,
        credits: 6,
        lecturers: ['Dr. Smith'],
        isElective: true,
        requiredPassedCourses: []
    });

    // then
    expect(createdCourse.name).toEqual('Full-stack development');
    expect(createdCourse.description).toEqual('Learn how to develop a full-stack app');
    expect(createdCourse.phase).toEqual(2);
    expect(createdCourse.credits).toEqual(6);
    expect(createdCourse.lecturers).toContain('Dr. Smith');
    expect(createdCourse.isElective).toBe(true);
});

test('given: empty name, when: course is created, then: an error is thrown', () => {
    // when
    const createCourse = () =>
        new Course({
            id: 1,
            name: '',
            description: 'Course description',
            phase: 2,
            credits: 5,
            lecturers: ['Dr. Smith'],
            isElective: false,
            requiredPassedCourses: []
        });

    // then
    expect(createCourse).toThrow('Name is required.');
});

test('given: missing description, when: course is created, then: an error is thrown', () => {
    // when
    const createCourse = () =>
        new Course({
            id: 1,
            name: 'Course Name',
            description: '',
            phase: 2,
            credits: 5,
            lecturers: ['Dr. Smith'],
            isElective: false,
            requiredPassedCourses: []
        });

    // then
    expect(createCourse).toThrow('Description is required.');
});

test('given: phase out of allowed range, when: course is created, then: an error is thrown', () => {
    // when
    const createCourse = () =>
        new Course({
            id: 1,
            name: 'Course Name',
            description: 'Valid description',
            phase: 4, // Invalid phase
            credits: 5,
            lecturers: ['Dr. Smith'],
            isElective: false,
            requiredPassedCourses: []
        });

    // then
    expect(createCourse).toThrow('Phase is required and can be 1 or 2.');
});

test('given: zero credits, when: course is created, then: an error is thrown', () => {
    // when
    const createCourse = () =>
        new Course({
            id: 1,
            name: 'Course Name',
            description: 'Valid description',
            phase: 2,
            credits: 0, // Invalid credits
            lecturers: ['Dr. Smith'],
            isElective: false,
            requiredPassedCourses: []
        });

    // then
    expect(createCourse).toThrow('Credits are required and cannot be negative');
});

test('given: no lecturers assigned, when: course is created, then: an error is thrown', () => {
    // when
    const createCourse = () =>
        new Course({
            id: 1,
            name: 'Course Name',
            description: 'Valid description',
            phase: 2,
            credits: 5,
            lecturers: [], // No lecturers provided
            isElective: false,
            requiredPassedCourses: []
        });

    // then
    expect(createCourse).toThrow('Lecturer is required.');
});

test('given: undefined elective status, when: course is created, then: an error is thrown', () => {
    // when
    const createCourse = () =>
        new Course({
            id: 1,
            name: 'Course Name',
            description: 'Valid description',
            phase: 2,
            credits: 5,
            lecturers: ['Dr. Smith'],
            isElective: null as unknown as boolean, // Undefined elective status
            requiredPassedCourses: []
        });

    // then
    expect(createCourse).toThrow('Course has to be an elective or non elective');
});

test('given: duplicate required course, when: the same course is added as a required course, then: an error is thrown', () => {
    // given
    const prerequisiteCourse = new Course({
        id: 2,
        name: 'Prerequisite Course',
        description: 'A prerequisite course',
        phase: 1,
        credits: 3,
        lecturers: ['Dr. Johnson'],
        isElective: false,
        requiredPassedCourses: []
    });

    const mainCourse = new Course({
        id: 1,
        name: 'Main Course',
        description: 'A main course',
        phase: 2,
        credits: 5,
        lecturers: ['Dr. Smith'],
        isElective: false,
        requiredPassedCourses: [prerequisiteCourse]
    });

    // when
    const addDuplicateCourse = () => {
        mainCourse.requiredCourse = prerequisiteCourse;
    };

    // then
    expect(addDuplicateCourse).toThrow('Course is already required');
});
