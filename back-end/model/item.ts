
export class Item {
    name: string;
    quantity: number;

    constructor(item: {name: string, quantity: number}) {
        this.validate(item)

        this.name = item.name
        this.quantity = item.quantity
    }

    validate(item: {name: string, quantity: number}) {
        // name validation
        if (item.name.length < 1 || item.name.trim().length < 1) {
            throw new Error("Name must not be empty")
        }
        // quantity validation
        if (item.quantity < 1) {
            throw new Error("Quantity cannot be 0")
        }
    }
    
    addQuantity(number : number) {
        this.quantity += number
    }

    decreaseQuantity(number : number) {
        this.quantity -= number
    }

    getName(): string {
        return this.name;
    }

    getQuantity(): number {
        return this.quantity;
    }
}