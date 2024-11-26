import { profile } from 'console';
import { Profile } from './profile';
import { Event } from './event';

import {
    User as userPrisma,
    Profile as profilePrisma,
    Category as categoryPrisma,
    Location as locationPrisma,
    UserEvent as userEventPrisma,
    Event as eventPrisma,
} from '@prisma/client';

export class User {
    private id?: number;
    private userName: string;
    private password: string;
    private profile: Profile;
    private events: Event[];

    constructor(user: {
        id?: number;
        userName: string;
        password: string;
        profile: Profile;
        events?: Event[];
    }) {
        this.validate(user);
        this.userName = user.userName;
        this.password = user.password;
        this.profile = user.profile;
        this.events = user.events || [];
    }

    validate(user: { userName: string; password: string; profile: Profile }) {
        if (!user.userName) throw new Error('Username is required.');
        if (!user.password) throw new Error('Password is required.');
        // Profile is validated with creation of profile
    }

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile {
        return this.profile;
    }

    getEvents(): Event[] {
        return this.events;
    }

    addEvent(event: Event) {
        this.events.push(event);
    }

    static from = ({
        id,
        userName,
        password,
        profile,
        events,
    }: userPrisma & {
        profile: profilePrisma & {
            location: locationPrisma;
            category: categoryPrisma;
        };
        events: (userEventPrisma & {
            event: eventPrisma & {
                location: locationPrisma;
                category: categoryPrisma;
            };
        })[];
    }) => {
        return new User({
            id,
            userName,
            password,
            profile: Profile.from(profile),
            events: events.map((userEvent) => Event.from(userEvent.event)),
        });
    };
}
