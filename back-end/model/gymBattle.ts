import { Badge } from "./badge";

export class GymBattle {
    private id?: number;
    private date: Date;
    private time: Date;
    private badge: Badge;

    constructor(gymBattle: {
        id?: number,
        date: Date,
        time: Date,
        badge: Badge
    }) {
        this.id = gymBattle.id;
        this.date = gymBattle.date;
        this.time = gymBattle.time;
        this.badge = gymBattle.badge;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getTime(): Date {
        return this.time;
    }

    getBadge(): Badge {
        return this.badge;
    }
}