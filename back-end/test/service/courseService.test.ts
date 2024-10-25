import CourseShortView from "../../types/courseShortView";
import courseService from "../../service/course.service";
import courseRepository from "../../repository/course.db";
import studentService from "../../service/student.service";
import ispService from "../../service/isp.service";
import dummyCourses from "../../data/courses";
import {errorMessages} from "../../service/course.service";

let mockDBFindAll: jest.Mock;
let mockDBFindById: jest.Mock;
let mockDBDeleteCourses: jest.Mock;
let mockDBFindAllByRequiredCourseId: jest.Mock;
let mockStudentServiceGetAllByPassedCourseId: jest.Mock;
let mockISPServiceGetAllByCourseId: jest.Mock;

beforeEach(() => {
    mockDBFindAll = jest.fn();
    mockDBFindById = jest.fn();
    mockDBDeleteCourses = jest.fn();
    mockDBFindAllByRequiredCourseId = jest.fn();
    mockStudentServiceGetAllByPassedCourseId = jest.fn();
    mockISPServiceGetAllByCourseId = jest.fn();

    courseRepository.findAll = mockDBFindAll;
    courseRepository.findById = mockDBFindById;
    courseRepository.deleteCourses = mockDBDeleteCourses;
    courseRepository.findAllByRequiredCourseId = mockDBFindAllByRequiredCourseId;
    studentService.getAllByPassedCourseId = mockStudentServiceGetAllByPassedCourseId;
    ispService.getAllByCourseId = mockISPServiceGetAllByCourseId;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given a list of courses, when getAll is called, then it should return the list of courses", () => {
    mockDBFindAll.mockReturnValue(dummyCourses);

    const result = courseService.getAll();

    expect(result).toEqual(dummyCourses);
    expect(mockDBFindAll).toHaveBeenCalledTimes(1);
});

test("given a list of courses, when getAllShort is called, then it should return the list of courses in short view", () => {
    mockDBFindAll.mockReturnValue(dummyCourses);

    const result = courseService.getAllShort();

    expect(result).toEqual(dummyCourses.map(course => new CourseShortView(course)));
    expect(mockDBFindAll).toHaveBeenCalledTimes(1);
});

test("given a list of courses, when getCourseById is called, then it should return the course with this id", () => {
    mockDBFindById.mockReturnValue(dummyCourses[1]);

    const result = courseService.getCourseById(1);

    expect(result).toEqual(dummyCourses[1]);
    expect(mockDBFindById).toHaveBeenCalledTimes(1);
});

test("given a list of courses and wrong ID, when getCourseById is called, then it should throw an exception", () => {
    mockDBFindById.mockReturnValue(null);

    expect(() => courseService.getCourseById(1)).toThrow(errorMessages.ERROR_COURSE_NOT_EXIST(1));
    expect(mockDBFindById).toHaveBeenCalledTimes(1);
});

describe('delete courses', () => {

    beforeEach(() => {
        mockDBFindById.mockImplementation((id) => dummyCourses[0]);
        mockDBFindAllByRequiredCourseId.mockImplementation((id) => []);
        mockISPServiceGetAllByCourseId.mockImplementation((id) => []);
        mockStudentServiceGetAllByPassedCourseId.mockImplementation((id) => []);
    });    

    test('given a list of course IDs, when deleteCourses is called, then it should delete the courses', () => {
        mockDBFindById.mockImplementation((id) => ({ id, name: `Course ${id}` }));
        mockDBFindAllByRequiredCourseId.mockImplementation((id) => "");
        mockISPServiceGetAllByCourseId.mockImplementation((id) => "");
        mockStudentServiceGetAllByPassedCourseId.mockImplementation((id) => "");

        const ids = [1, 2, 3];
        const result = courseService.deleteCourses(ids);

        expect(result).toBe("Courses are successfully deleted");
        expect(mockDBFindById).toHaveBeenCalledTimes(ids.length);
        expect(mockDBDeleteCourses).toHaveBeenCalledWith(ids);
    });

    test('given a list of course IDs with one non-existent ID, when deleteCourses is called, then it should throw an exception', () => {
        mockDBFindById.mockImplementation((id) => id === 2 ? null : { id, name: `Course ${id}` });
        
        const ids = [1, 2, 3];

        expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_NOT_EXIST(2));
        expect(mockDBFindById).toHaveBeenCalledTimes(2);
    });

    test('given a list of course IDs with one required by ISP, when deleteCourses is called, then it should throw an exception', () => {
        mockISPServiceGetAllByCourseId.mockImplementation((id) => id === 2 ? [{ id: 1, name: `ISP ${id}` }] : []);

        const ids = [1, 2, 3];

        expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_CHOSEN_IN_ISP(2));
        expect(mockDBFindById).toHaveBeenCalledTimes(2);
    });

    test('given a list of course IDs with one passed by student, when deleteCourses is called, then it should throw an exception', () => {
        mockStudentServiceGetAllByPassedCourseId.mockImplementation((id) => id !== 2 ? [] : [{ id: 1, name: `Student ${id}` }]);

        const ids = [1, 2, 3];

        expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_PASSED_BY_STUDENT(2));
        expect(mockDBFindById).toHaveBeenCalledTimes(2);
    });

    test('given a list of course IDs with one required by another course, when deleteCourses is called, then it should throw an exception', () => {
        mockDBFindAllByRequiredCourseId.mockImplementation((id) => id !== 2 ? [] : [{ id, name: `Course ${id}` }]);

        const ids = [1, 2, 3];

        expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_REQUIRED_BY_COURSE(2));
        expect(mockDBFindById).toHaveBeenCalledTimes(2);
    });
});
