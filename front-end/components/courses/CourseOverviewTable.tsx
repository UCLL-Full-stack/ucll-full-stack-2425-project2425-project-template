import React from "react";
import { Course, Lecturer } from "@types";

type Props = {
  selectedLecturer: Lecturer;
};

const CourseOverviewTable: React.FC<Props> = ({ selectedLecturer }: Props) => {
  let courses = selectedLecturer.courses as Course[];
  return (
    <>
      <h2>Courses taught by {selectedLecturer.user.firstName}</h2>
      {courses && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Phase</th>
              <th scope="col">Credits</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} onClick={() => {}} role="button">
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.phase}</td>
                <td>{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CourseOverviewTable;
