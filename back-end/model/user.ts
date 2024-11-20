import { Project } from './project';
import { Task } from './task';
import { Role } from '../types';

export class User {
    readonly id?: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly projects: Project[] = [];
    readonly tasks: Task[] = [];

    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        projects?: Project[];
        tasks?: Task[];
    }) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.projects = user.projects || [];
        this.tasks = user.tasks || [];
    }

    private validate(user: { id?: number; firstName: string; lastName: string; email: string; password: string; role: Role; projects?: Project[]; tasks?: Task[] }) {
        if (!user.firstName) {
            throw new Error('First name is required');
        }
        if (!user.lastName) {
            throw new Error('Last name is required');
        }
        if (!user.email) {
            throw new Error('Email is required');
        }
        if (!user.password) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
        if (user.projects && !Array.isArray(user.projects)) {
            throw new Error('Projects must be an array');
        }
        if (user.tasks && !Array.isArray(user.tasks)) {
            throw new Error('Tasks must be an array');
        }
    }

    static from(userPrisma: any): User {
        return new User({
            id: userPrisma.id,
            firstName: userPrisma.firstName,
            lastName: userPrisma.lastName,
            email: userPrisma.email,
            password: userPrisma.password,
            role: userPrisma.role,
            projects: userPrisma.projects?.map(Project.from) || [],
            tasks: userPrisma.tasks?.map(Task.from) || [],
        });
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): Role {
        return this.role;
    }

    public getProjects(): Project[] {
        return this.projects;
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    equals(user: User): boolean {
        return this.id === user.getId() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.projects === user.getProjects() &&
            this.tasks === user.getTasks();
    }
}