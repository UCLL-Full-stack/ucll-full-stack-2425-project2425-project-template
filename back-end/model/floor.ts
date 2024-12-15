import { 
    Floor as FloorPrisma,
    Line as LinePrisma,
    Position as PositionPrisma,
    Player as PlayerPrisma,
    User as UserPrisma,
} from "@prisma/client"; 

import { Line } from "./line";
import { Position } from "./position";

export class Floor {
    private id?: number;
    private floornumber: number;
    private tiles?: Line[];
    private positions?: Position[];

    constructor(floor: {
        id?: number;
        tiles?: Line[];
        positions?: Position[];
        floornumber: number;
    }) {
        if (floor.tiles == undefined || floor.tiles.length === 0){
            floor.tiles = this.generateTiles();
            if (floor.positions == undefined || floor.positions.length === 0){
                floor.positions = this.generatePositions(floor.tiles);
            }
        }
        this.validate(floor);



        this.id = floor.id;
        this.floornumber = floor.floornumber;
        this.tiles = floor.tiles;
        this.positions = floor.positions;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFloornumber(): number {
        return this.floornumber;
    }

    getTiles(): Line[] | undefined {
        return this.tiles;
    }

    getPositions(): Position[] | undefined {
        return this.positions;
    }

    canMoveToPosition(x: number, y: number): boolean {
        const line = this.tiles?.at(y);
        if (line?.getTiles().at(x) === "floor"){
            if (this.positions){
                this.positions.forEach(pos => {
                    if (pos.getX() === x && pos.getY() === y && pos.getActive() === true){
                        return false;
                    }
                });
            }
            return true;
        }
        return false;
    }

    validate(floor: {
        floornumber: number;
        tiles?: Line[];
    }) {
        if (floor.floornumber <= 0) {
            throw new Error('Needs to be above 0.');
        }
        if (!floor.tiles || floor.tiles.length === 0) {
            throw new Error('Tiles are required.');
        }
    }

    generateTiles(): Line[]{
        let tiles = new Array<Line>();
        for (let i = 0; i < 20; i++) {
            tiles[i] = new Line({tiles: [], lineNum: i});
            for (let j = 0; j < 20; j++){
                if (i === 0 || i === 19 || j === 0 || j === 19){
                    tiles[i].setTile(j, "void");
                }
                else if (i === 1 || i === 18 || j === 1 || j === 18){
                    tiles[i].setTile(j, "wall");
                }
                else{
                    const randomnum = getRandomInt(0, 10);
                    if (randomnum <= 2){
                        tiles[i].setTile(j, "wall");
                    }
                    else {
                        tiles[i].setTile(j, "floor");
                    }
                }
            }
        }
        return tiles;
    }

    generatePositions(input: Line[]): Position[]{
        let positions = new Array<Position>();
        if (input !== undefined){
            input.map((line, y) => {
                line.getTiles().map((tile, x) => {
                    if (tile === "floor"){
                        const rando = getRandomInt(0, 10);
                        if (rando === 1){
                            positions.push(new Position({x: x, y: y, type: "ball", active: true}))
                        }
                    }
                });
            });
        }
        return positions;
    }

    static from({
        id,
        floornumber,
        tiles,
        positions,
    }: FloorPrisma & {
        tiles: LinePrisma[];
        positions: PositionPrisma[];
    }) {
        return new Floor({
            id,
            floornumber,
            tiles: tiles.map((tile) => Line.from(tile)),
            positions: positions.map((pos) =>Position.from(pos))
        })
    }
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}