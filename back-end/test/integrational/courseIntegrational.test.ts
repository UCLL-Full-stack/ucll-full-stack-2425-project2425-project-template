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
});
