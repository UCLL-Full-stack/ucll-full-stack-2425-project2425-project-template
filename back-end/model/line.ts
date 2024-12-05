import { Floor, Line as LinePrisma } from '@prisma/client';

export class Line {
    private id?: number;
    private tiles: string[];
    private lineNum: number;
    private floorId?: number;

    constructor(line: { id?: number; floorId?: number; tiles: string[]; lineNum: number }) {
        this.id = line.id;
        this.lineNum = line.lineNum;
        this.tiles = line.tiles;
        this.floorId = line.floorId;
    }

    getId(): number | undefined {
        return this.id;
    }

    getLineNum(): number {
        return this.lineNum;
    }

    getTiles(): string[] {
        return this.tiles;
    }

    getFloor(): number | undefined {
        return this.floorId;
    }

    setTile(j: number, input: string) {
        this.tiles[j] = input;
    }

    setFloor(id: number) {
        this.floorId = id;
    }

    static from({ id, tiles, lineNum, floorId }: LinePrisma) {
        return new Line({
            id,
            tiles,
            lineNum,
            floorId,
        });
    }
}
