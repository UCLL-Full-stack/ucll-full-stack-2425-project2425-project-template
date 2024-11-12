import { Floor, getRandomInt } from './floor';
import { User } from './user';
import { 
    User as UserPrisma
} from "@prisma/client"; 

export class World {
    private id?: number;
    private name: string;
    private owner: User;
    private floors: Floor[];

    constructor(world: {
        id?: number;
        name: string;
        owner: User;
        floors: Floor[];
    }) {
        this.validate(world);

        this.id = world.id;
        this.name = world.name;
        this.owner = world.owner;
        this.floors = world.floors;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getOwner(): User {
        return this.owner;
    }

    getFloors(): Floor[] {
        return this.floors;
    }

    validate(world: {
        name: string;
        owner: User;
        floors: Floor[];
    }) {
        if (!world.name) {
            throw new Error('Name is required.');
        }
        if (!world.floors) {
            throw new Error('Floors are required.');
        }
        if (world.floors.length <= 0) {
            throw new Error('Need atleast 1 floor.');
        }
        if (!world.owner) {
            throw new Error('An owner is required.');
        }
    }
}
