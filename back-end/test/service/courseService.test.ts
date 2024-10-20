import CourseShortView from "../../types/courseShortView";
import courseService from "../../service/course.service";
import courseRepository from "../../repository/course.db";
import dummyCourses from "../../data/courses";

let mockDBFindAll: jest.Mock;
let mockDBFindById: jest.Mock;
let mockDBDeleteCourses: jest.Mock;


beforeEach(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

test("given a list of courses, when getAll is called, then it should return the list of courses", () => {
    mockDBFindAll = jest.fn(() => dummyCourses);
    courseRepository.findAll = mockDBFindAll;

    const result = courseService.getAll();

    expect(result).toEqual(dummyCourses);
    expect(mockDBFindAll).toHaveBeenCalledTimes(1);
});

test("given a list of courses, when getAllShort is called, then it should return the list of courses in short view", () => {
    mockDBFindAll = jest.fn(() => dummyCourses);
    courseRepository.findAll = mockDBFindAll;

    const result = courseService.getAllShort();

    expect(result).toEqual(dummyCourses.map(course => new CourseShortView(course)));
    expect(mockDBFindAll).toHaveBeenCalledTimes(1);
});

test("given a list of courses, when getCourseById is called, then it should return the course with this id", () => {
    mockDBFindById = jest.fn(() => dummyCourses[1]);
    courseRepository.findById = mockDBFindById;

    const result = courseService.getCourseById(1);

    expect(result).toEqual(dummyCourses[1]);
    expect(mockDBFindById).toHaveBeenCalledTimes(1);
});

test("given a list of courses and wrong ID, when getCourseById is called, then it should throw an exception", () => {
    mockDBFindById = jest.fn(() => null);
    courseRepository.findById = mockDBFindById;

    expect(() => courseService.getCourseById(1)).toThrow(`Course with id 1 does not exist`);
    expect(mockDBFindById).toHaveBeenCalledTimes(1);
});

test("given a list of courses and wrong ID, when getCourseById is called, then it should throw an exception", () => {
    mockDBFindById = jest.fn(() => null);
    courseRepository.findById = mockDBFindById;

    expect(() => courseService.getCourseById(1)).toThrow(`Course with id 1 does not exist`);
    expect(mockDBFindById).toHaveBeenCalledTimes(1);
});

test('given a list of course IDs, when deleteCourses is called, then it should delete the courses', () => {
    mockDBFindById = jest.fn((id) => ({ id, name: `Course ${id}` }));
    mockDBDeleteCourses = jest.fn();
    courseRepository.findById = mockDBFindById;
    courseRepository.deleteCourses = mockDBDeleteCourses;

    const ids = [1, 2, 3];
    const result = courseService.deleteCourses(ids);

    expect(result).toBe("Courses are successfully deleted");
    expect(mockDBFindById).toHaveBeenCalledTimes(ids.length);
    expect(mockDBDeleteCourses).toHaveBeenCalledWith(ids);
});

test('given a list of course IDs with one non-existent ID, when deleteCourses is called, then it should throw an exception', () => {
    mockDBFindById = jest.fn((id) => id === 2 ? null : { id, name: `Course ${id}` });
    courseRepository.findById = mockDBFindById;

    const ids = [1, 2, 3];

    expect(() => courseService.deleteCourses(ids)).toThrow(`Course with id 2 does not exist`);
    expect(mockDBFindById).toHaveBeenCalledTimes(2);
});