export class Player {
    readonly id: number;
    readonly name: string;
    readonly position: string;
    readonly birthdate: Date;

    constructor(player: {id: number, name: string, position: string, birthdate: Date}) {
        this.id = player.id;
        this.name = player.name;
        this.position = player.position;
        this.birthdate = player.birthdate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPosition(): string { 
        return this.position;
    }

    getBirthdate(): Date {
        return this.birthdate;
    }

    setId(id: number): void {
        id = id;
    }

    equeals(player: Player): boolean {
        return this.id === player.id && this.name === player.name && this.position === player.position && this.birthdate === player.birthdate;
    }
}
