import { Species as SpeciesPrisma } from "@prisma/client";

export class Species {
    private id?: number;
    private species: string;

    constructor(species: {
        id?: number;
        species: string;
    }) {
        this.validate(species);
        
        this.id = species.id;
        this.species = species.species;
    }

    getId(): number | undefined {
        return this.id;
    }

    getSpecies(): string {
        return this.species;
    }

    validate(species: {species: string}){
        if (!species.species?.trim()) {
            throw new Error("Species is required and cannot be empty.");
        }
    }

    static from({
        id,
        species,
    }: SpeciesPrisma) {
        return new Species({
            id,
            species,
        })
    }

    equals(species: Species): boolean {
        return (
            this.species === species.getSpecies()
        );
    }
}
