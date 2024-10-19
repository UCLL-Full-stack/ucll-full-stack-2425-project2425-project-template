import CourseShortView from "../../types/courseShortView";
import courseService from "../../service/course.service";
import courseRepository from "../../repository/course.db";
import dummyCourses from "../../data/courses";
let mockDBFindAll: jest.Mock;
let mockDBFindById: jest.Mock;


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