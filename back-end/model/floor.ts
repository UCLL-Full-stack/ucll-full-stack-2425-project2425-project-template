import { 
    Floor as FloorPrisma,
    Line as LinePrisma,
} from "@prisma/client"; 

import { Line } from "./line";
import { link } from "fs";

export class Floor {
    private id?: number;
    private floornumber: number;
    private tiles: Line[];


    constructor(floor: {
        id?: number;
        floornumber: number;
        tiles: Line[];
    }) {
        if (floor.tiles.length === 0){
            floor.tiles = this.generateTiles();
        }
        this.validate(floor);

        this.id = floor.id;
        this.floornumber = floor.floornumber;
        this.tiles = floor.tiles;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFloornumber(): number {
        return this.floornumber;
    }

    getTiles(): Line[] {
        return this.tiles;
    }

    validate(floor: {
        floornumber: number;
        tiles: Line[];
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

    static from({
        id,
        floornumber,
        tiles,
    }: FloorPrisma & {
        tiles: LinePrisma[];
    }) {
        return new Floor({
            id,
            floornumber,
            tiles: tiles.map((tile) => Line.from(tile))
        })
    }
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}