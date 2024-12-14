import { User as UserPrisma, Submission as SubmissionPrisma } from '@prisma/client';
import { Permission } from '../types'
import { Submission } from './Submission';

export class User {
    private _id?: number | undefined;
    private username: string;
    private password: string;
    private name: string;
    private surname: string;
    private email: string;
    private permission: Permission;
    private createdAt: Date;
    private submissions?: Submission[];

    constructor(user: { id?: number, username: string, name: string, surname: string, email: string, password: string, permission: Permission, submissions?: Submission[], createdAt: Date }) {
        this.validate(user);
        
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.permission = user.permission;
        this.createdAt = user.createdAt
        if (user.submissions) this.submissions = user.submissions;
        else this.submissions = [];
    }

    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getName(): string {
        return this.name;
    }

    getSurname(): string {
        return this.surname;
    }

    getEmail(): string {
        return this.email;
    }

    getPermission(): Permission {
        return this.permission
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getSubmissions(): Submission[] | undefined {
        return this.submissions;
    }

    validate(user: { 
        username: string, 
        password: string, 
        name: string, 
        surname: string, 
        email: string, 
        permission: Permission, 
        id?: number 
    }): void {
        if (!user.username) {
            throw new Error('Username is required');
        }
        if (!user.name) {
            throw new Error('Name is required');
        }
        if (!user.surname) {
            throw new Error('Surname is required');
        }
        if (!user.email) {
            throw new Error('Email is required');
        }
        if (!user.permission) {
            throw new Error('Permission is required');
        }
        if (!user.password) {
            throw new Error('Password is required');
        }
        
    }

    equals({ id, username, password, name, surname, email, permission, createdAt, submissions }: { id?: number, username: string, password: string, name: string, surname: string, email: string, permission: Permission, createdAt: Date, submissions?: Submission[] }): boolean {
        return (
            id === this.getId() &&
            username === this.getUsername() &&
            password === this.getPassword() &&
            name === this.getName() &&
            surname === this.getSurname() &&
            email === this.getEmail() &&
            permission === this.getPermission() &&
            createdAt === this.getCreatedAt() &&
            submissions === this.getSubmissions()
        );
    }

    static from({ 
        id, 
        username, 
        password, 
        name, surname, 
        email, 
        permission, 
        createdAt, 
        submissions,
    }: UserPrisma & {
        submissions?: SubmissionPrisma[];
    }) {
        return new User({
            id,
            username,
            password,
            name,
            surname,
            email,
            permission: permission as Permission,
            createdAt,
            submissions: submissions?.map(submission => Submission.from(submission))
        });
    }
}