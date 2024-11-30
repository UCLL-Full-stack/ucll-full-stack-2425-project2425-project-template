import { Category } from './category';
import { Location } from './location';
import { Event } from './event';
import {
    Profile as profilePrisma,
    Location as locationPrisma,
    Category as categoryPrisma,
} from '@prisma/client';

export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private age: number;
    private administrator: boolean;
    private location: Location;
    private category: Category;
    private events: Event[];

    constructor(profile: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        administrator: boolean;
        location: Location;
        category: Category;
        events?: Event[];
    }) {
        this.validate(profile);
        this.id = profile.id;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.email = profile.email;
        this.age = profile.age;
        this.administrator = profile.administrator;
        this.location = profile.location;
        this.category = profile.category;
        this.events = profile.events || [];
    }

    validate(profile: {
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        administrator: boolean;
        location: Location;
        category: Category;
    }) {
        if (!profile.firstName) throw new Error('First name is required.');
        if (!profile.lastName) throw new Error('Last name is required.');
        if (!profile.email) throw new Error('Email is required.');
        if (!profile.age) throw new Error('Age is required.');
        if (!profile.location) throw new Error('Location is required.');
        if (!profile.category) throw new Error('Category is required.');
    }

    isAdmin(): boolean {
        return this.administrator;
    }
    getAge(): number {
        return this.age;
    }
    getEmail(): string {
        return this.email;
    }
    getLastName(): string {
        return this.lastName;
    }
    getFirstName(): string {
        return this.firstName;
    }
    getLocation(): Location {
        return this.location;
    }
    getCategory(): Category {
        return this.category;
    }
    getEvents(): Event[] {
        return this.events;
    }

    addEvent(event: Event) {
        this.events.push(event);
    }

    static from = ({
        id,
        firstName,
        lastName,
        email,
        age,
        administrator,
        location,
        category,
    }: profilePrisma & {
        location: locationPrisma;
        category: categoryPrisma;
    }) => {
        return new Profile({
            id,
            firstName,
            lastName,
            email,
            age,
            administrator,
            location: Location.from(location),
            category: Category.from(category),
        });
    };
}
