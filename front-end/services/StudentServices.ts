import { Student } from "@/types";

const loginStudent = (student: Student) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/students/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });
}

const StudentService = {
    loginStudent
}

export default StudentService