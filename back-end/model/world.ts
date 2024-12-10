import { Floor, getRandomInt } from './floor';
import { User } from './user';
import { 
    User as UserPrisma,
    World as WorldPrisma,
    Floor as FloorPrisma,
    Line as LinePrisma,
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
        world.floors.forEach(floor => {
           floor.setWorldId(world.id); 
        });
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

    static from({
        id,
        name,
        owner,
        floors,
    }: WorldPrisma & {
        owner: UserPrisma;
        floors: (FloorPrisma & { tiles: LinePrisma[] })[];
    }) {
        return new World({
            id,
            name,
            owner: User.from(owner),
            floors: floors.map((floor) => Floor.from(floor)),
        })
    }
}
