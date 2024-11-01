export class Pokemon {
    private id?: number;
    private name: string;
    private type: string;
    private stats: {hp:number,attack:number,defence:number,specialAttack:number,specialDefence:number,speed:number};
    private health: number;
    private canEvolve: boolean;

    constructor(pokemon: {
        id?: number;
        name: string;
        type: string;
        stats: {hp:number,attack:number,defence:number,specialAttack:number,specialDefence:number,speed:number};
        health: number;
        canEvolve: boolean;
    }) {
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.type = pokemon.type;
        this.stats = pokemon.stats;
        this.health = pokemon.health;
        this.canEvolve = pokemon.canEvolve;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getStats(): {hp:number,attack:number,defence:number,specialAttack:number,specialDefence:number,speed:number} {
        return this.stats;
    }

    getHealth(): number {
        return this.health;
    }

    getCanEvolve(): boolean {
        return this.canEvolve;
    }
}