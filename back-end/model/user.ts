import { Role } from '../types';
import { Project } from './project';

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;
    private projects: Project[] = [];

    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        projects: Project[];
    }) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.projects = user.projects;
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

    equals(user: User): boolean {
        return this.id === user.getId() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.projects === user.getProjects();

    }

}