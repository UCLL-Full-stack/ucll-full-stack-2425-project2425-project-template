import { Part as PartPrisma } from "@prisma/client";

export class Part {
    static Part(partPrisma: any): import("./build").Build | PromiseLike<import("./build").Build | null> | null {
        throw new Error('Method not implemented.');
    }
    private id?: number;
    private name: string;
    private brand: string;
    private type: string;
    private price: number;

    constructor(part: {
        id?: number;
        name: string;
        brand: string;
        type: string;
        price: number;
    }) {
        this.validate(part);

        this.id = part.id;
        this.name = part.name;
        this.brand = part.brand;
        this.type = part.type;
        this.price = part.price;
    }

    validate(part: {
        name: string;
        brand: string;
        type: string;
        price: number;
    }) {
        if (!part.name) {throw new Error('Name cannot be empty');}
        if (!part.brand) {throw new Error('Brand cannot be empty');}
        if (!part.type) {throw new Error('Type cannot be empty');}

        if (part.price <= 0) {
            throw new Error('Price must be positive and non zero');
        }
    }

    static from ({ id, name, brand, type, price}: PartPrisma) {
        return new Part({
            id,
            name,
            brand,
            type,
            price,
        })
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getBrand(): string {
        return this.brand;
    }

    getType(): string {
        return this.type;
    }

    getPrice(): Number {
        return this.price;
    }
}