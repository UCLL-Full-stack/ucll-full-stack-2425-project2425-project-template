

export class Floor {
    private id?: number;
    private floornumber: number;
    private tiles: string[][];


    constructor(floor: {
        id?: number;
        floornumber: number;
        tiles: string[][];
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

    getTiles(): string[][] {
        return this.tiles;
    }

    validate(floor: {
        floornumber: number;
        tiles: string[][];
    }) {
        if (floor.floornumber <= 0) {
            throw new Error('Need atleast 1 floor.');
        }
        if (!floor.tiles) {
            throw new Error('Tiles are required.');
        }
    }

    generateTiles(): string[][]{
        let tiles = new Array<Array<string>>();
        for (let i = 0; i < 20; i++) {
            tiles[i] = [];
            for (let j = 0; j < 20; j++){
                if (i === 0 || i === 19 || j === 0 || j === 19){
                    tiles[i][j] = "void";
                }
                else if (i === 1 || i === 18 || j === 1 || j === 18){
                    tiles[i][j] = "wall";
                }
                else{
                    const randomnum = getRandomInt(0, 10);
                    if (randomnum <= 2){
                        tiles[i][j] = "wall"
                    }
                    else {
                        tiles[i][j] = "floor"
                    }
                }
            }
        }
        return tiles;
    }
    
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}