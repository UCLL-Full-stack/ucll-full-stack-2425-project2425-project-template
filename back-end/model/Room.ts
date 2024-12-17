import {Room as RoomPrisma} from "@prisma/client"; 

export class Room {
    private id?: number;
    private name: string;
    private chairs: number[];
    

    constructor(room: {
        id?: number;
        name: string;
        chairs: number[];
    }) {
        this.id = room.id;
        this.name = room.name;
        this.chairs = room.chairs;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getChairs(): number[] {
        return this.chairs;
    }

    static from({
        id,
        name,
        chairs,
    }: RoomPrisma) {
        return new Room ({
            id,
            name,
            chairs,
        })
    }

}
