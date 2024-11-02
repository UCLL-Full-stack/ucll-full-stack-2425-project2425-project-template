export class CarPart{
    private id?: number;
    private name: string;
    private price: number;
    private quantity: number;

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
}