const request = require('supertest');
const app = require('../../app');
import courses from '../../data/courses';
import CourseShortView from '../../types/courseShortView';
import { errorMessages } from '../../service/course.service';

describe('Course router', () => {
    describe('get all courses', () => {
        it('should return 200 and the courses', async () => {
            const response = await request(app)
                .get('/courses')
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(1);
            expect(response.body).toEqual(courses);
        });
    });

    describe('get all courses short', () => {
        it('should return 200 and the courses in short form', async () => {
            const response = await request(app)
                .get('/courses/short')
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(1);
            expect(response.body).toEqual(courses.map((course) => new CourseShortView(course)));
        });
    });

    describe('get a course by id', () => {
        let id: number = 1;
        it('should return 200 and the course with the given id', async () => {
            const response = await request(app)
                .get('/courses/' + id)
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(courses.find((course) => course.id === id));
        });
    });

    describe('throw an error: course with id does not exist', () => {
        let id: number = 112123;
        it('should return 400', async () => {
            const response = await request(app)
                .get('/courses/' + id)
                .set('content-type', 'application/json');

            expect(response.status).toBe(400);
            expect(response.text).toContain(errorMessages.ERROR_COURSE_NOT_EXIST(id));
        });
    });

    describe('delete courses by ids', () => {
        it('should return 200 and a success message', async () => {
            const ids = courses.slice(0, 3).map((course) => course.id);
            const response = await request(app)
                .delete('/courses/delete')
                .send(ids)
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.text).toEqual('Courses are successfully deleted');
        });
    });

    describe("throw an error: one of the course ids does not exist", () => {
        it("should return 500", async () => {
            const ids = [999999];
            const response = await request(app)
                .delete("/courses/delete")
                .send(ids)
                .set("content-type", "application/json");

            expect(response.status).toBe(400);
            expect(response.text).toContain(errorMessages.ERROR_COURSE_NOT_EXIST(ids[0]));
        });
    });
});
