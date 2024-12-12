import { Floor, Line as LinePrisma } from '@prisma/client';

export class Line {
    private id?: number;
    private tiles: string[];
    private lineNum: number;

    constructor(line: { id?: number; tiles: string[]; lineNum: number }) {
        this.id = line.id;
        this.lineNum = line.lineNum;
        this.tiles = line.tiles;
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

    setTile(j: number, input: string) {
        this.tiles[j] = input;
    }

    static from({ id, tiles, lineNum, floorId }: LinePrisma) {
        return new Line({
            id,
            tiles,
            lineNum,
        });
    }
}
