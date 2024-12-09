import { CarPart as CarPartPrisma } from '@prisma/client';  
export class CarPart{
    readonly id?: number;
    readonly name: string;
    readonly price: number;
    readonly quantity: number;

    constructor(carpart: {
        id? : number;
        name: string;
        price: number;
        quantity: number;
    }){
        this.id = carpart.id;
        this.name = carpart.name;
        this.price = carpart.price;
        this.quantity = carpart.quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    static from(carpart: CarPartPrisma): CarPart {
        return new CarPart({
            id: carpart.id,
            name: carpart.name,
            price: carpart.price,
            quantity: carpart.quantity
        });
    }
}