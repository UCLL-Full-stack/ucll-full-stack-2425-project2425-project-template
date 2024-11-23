import { Car as CarPrisma } from '@prisma/client';
export class Car {
    readonly id?: number;
    readonly model: string;
    readonly brand: string;
    readonly year: number;
    readonly licensePlate: string;
    readonly price: number;

    constructor(car: {
        id?: number;
        model: string;
        brand: string;
        year: number;
        licensePlate: string;
        price: number;
    }) {
        this.id = car.id;
        this.model = car.model;
        this.brand = car.brand;
        this.year = car.year;
        this.licensePlate = car.licensePlate;
        this.price = car.price;
    }

    equals({ id, model, brand, year, licensePlate, price }: Car): boolean {
        return(
            this.id === id && 
            this.model === model && 
            this.brand === brand && 
            this.year === year && 
            this.licensePlate === licensePlate && 
            this.price === price
        );
    }

    getId(): number | undefined {
        return this.id;
    }

    getModel(): string {
        return this.model;
    }

    getBrand(): string {
        return this.brand;
    }

    getYear(): number {
        return this.year;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }

    getPrice(): number {
        return this.price;
    }

    static from({ id, model, brand, year, licensePlate, price }: CarPrisma) {
        return new Car({ 
            id, 
            model, 
            brand, 
            year, 
            licensePlate, 
            price });
    }
}
