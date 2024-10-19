const request = require("supertest");
const app = require("../../app");
import courses from "../../data/courses";
import CourseShortView from "../../types/courseShortView";

describe("Course router", () => {

    describe("get all courses", () => {
        it("should return 200 and the courses", async () => {
            const response = await request(app)
                .get("/courses")
                .set("content-type", "application/json");

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(1);
            expect(response.body).toEqual(courses);
        });
    });

    describe("get all courses short", () => {
        it("should return 200 and the courses in short form", async () => {
            const response = await request(app)
                .get("/courses/short")
                .set("content-type", "application/json");

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(1);
            expect(response.body).toEqual(courses.map(course => new CourseShortView(course)));
        });
    });

    describe("get a course by id", () => {
        let id : number = 1
        it("should return 200 and the course with the given id", async () => {
            const response = await request(app)
                .get("/courses/" + id)
                .set("content-type", "application/json");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(courses.find(course => course.id === id));
        });
    });

    describe("throw an error: course with id does not exist", () => {
        let id : number = 112123
        it("should return 500", async () => {
            const response = await request(app)
                .get("/courses/" + id)
                .set("content-type", "application/json");

            expect(response.status).toBe(500);
            expect(response.text).toContain("Course with id 112123 does not exist");
        });
    });
});
