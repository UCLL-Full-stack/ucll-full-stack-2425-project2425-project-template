import { th } from "date-fns/locale";

export class Privilege{
    private id: number;
    private name: string;
    private description: string;

    constructor(privilege:{id: number, name: string, description: string}) {
        this.id = privilege.id;
        this.name = privilege.name;
        this.description = privilege.description;
    }

    getId(): number {
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getDescription(): string{
        return this.description;
    }
}