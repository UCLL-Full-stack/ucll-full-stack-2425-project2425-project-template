import { Course } from "../../model/course";


const course = new Course({
    id: 1,
    name: 'Full-stack development',
    description: 'Learn how to develop a full-stack app',
    phase: 2,
    credits: 6,
    lecturers: ['Dr. Smith'],
    isElective: true,
    requiredPassedCourses: []
});

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
