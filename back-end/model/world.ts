import { Floor, getRandomInt } from './floor';
import { User } from './user';

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
        if (world.floors.length === 0){
            world.floors = generateFloors();
        }
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

    generateFloors(): Floor[]{
        let floors = new Array<Floor>();
        const amount = getRandomInt(4, 20);
        for (let i = 0; i < amount; i++){
            floors[i] = new Floor({1, new Array<Array<Floor>>(),})
        }

        return floors;
    }
}
