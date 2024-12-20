import { Booking } from './booking';
import { Student as StudentPrisma, Booking as BookingPrisma, Review as ReviewPrisma, Trip as TripPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';

export class Student {
    private id?: number;
    private studentNumber: string;
    private user: User;

    constructor(student: {
        id?: number;
        user: User;
        studentNumber: string;
    }) {
        this.id = student.id;
        this.user = student.user;
        this.studentNumber = student.studentNumber;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getStudentnumber(): string {
        return this.studentNumber;
    }

    validate() {
        if (!this.studentNumber || this.studentNumber.trim() === '') {
            throw new Error('Student number is required.');
        }
    }

    equals(student: Student): boolean {
        return (
            this.id === student.getId() &&
            this.studentNumber === student.getStudentnumber() &&
            this.user.equals(student.getUser())
        );
    }

    static from({
        id,
        user,
        studentNumber,
    }: StudentPrisma & { user: UserPrisma }): Student {
        return new Student({
            id: id ? Number(id) : undefined,
            user: User.from(user),
            studentNumber,
        });
    }
}
