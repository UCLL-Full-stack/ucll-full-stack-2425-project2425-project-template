import { Course } from '../types/index';

const URL = process.env.NEXT_PUBLIC_API_URL + '/courses';

const getAllCourses = async (): Promise<Course[]> => {
  const response = await fetch(URL);
  return await response.json();
}

const getAllShortCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${URL}/short`);
  return await response.json();
}

const getCourseById = async (id: number): Promise<Course> => {
  const response = await fetch(`${URL}/${id}`);
  return await response.json();
}

const createCourse = async (course: Course): Promise<Course> => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  return await response.json();
}

const updateCourse = async (id: number, course: Course): Promise<Course> => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  return await response.json();
}

const deleteCourses = async (courseIds: number[]): Promise<string> => {
  const response = await fetch(`${URL}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseIds),
  });
  return await response.text();
}

const CourseService = {
  getAllCourses,
  getAllShortCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourses,
};

export default CourseService;
