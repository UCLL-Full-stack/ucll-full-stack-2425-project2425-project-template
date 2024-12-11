import { Badge } from "./badge";
import { 
    GymBattle as GymBattlePrisma,
    Badge as BadgePrisma
 } from "@prisma/client";
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

    equals(gymBattle: GymBattle): boolean{
        return(
            this.id === gymBattle.getId() &&
            this.date === gymBattle.getDate() &&
            this.time === gymBattle.getTime() &&
            this.badge.equals(gymBattle.getBadge())
        );
    }

    static from({id,date,time,badge}:GymBattlePrisma & {badge: BadgePrisma}) {
        return new GymBattle({
            id,
            date,
            time,
            badge: Badge.from(badge),
        });
    }
}