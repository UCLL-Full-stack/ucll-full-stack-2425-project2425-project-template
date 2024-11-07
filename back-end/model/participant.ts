import { User } from "./user";
import { Event } from "./event";

import {
    Participant as ParticipantPrisma,
    Event as EventPrisma,
    User as UserPrisma,
} from '@prisma/client';

export class Participant {
    private id?: number;
    private user: User;
    private events: Event[];

    constructor(participant: {
        id?: number,
        user: User,
        // events?: Event[];
        events: Event[];
    }) {
        this.user = participant.user;
        if (participant.events){
            this.events = participant.events;
        } else {
            this.events = [];
        }
    }

    addEvent(event: Event) {
        this.events.push(event);
    }

    getEvents(): Event[] {
        return this.events;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    equals(participant: Participant): boolean {
        return(
            this.user === participant.getUser()
        );
    }

    static from({
        id,
        user,
        events,
    }: ParticipantPrisma & {user: UserPrisma; events: EventPrisma[]}) {
        return new Participant({
            id,
            user: User.from(user),
            events: events.map((event) => Event.from(event)),
        });
    }
}