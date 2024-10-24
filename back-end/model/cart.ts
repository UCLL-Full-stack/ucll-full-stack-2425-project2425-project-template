export class Cart {
    private id!: number;
    private totalPrice!: number;
    private customerId!: number;
    // Q&A Is it not better to use setters immediately in the constructor? A: https://stackoverflow.com/questions/61690611/typescript-not-recognising-initialising-via-a-setter
    //I also thought of the same thing. I thing we could

    constructor(cart: { id: number, totalPrice: number, customerId: number }) {
        this.setId(cart.id);
        this.setTotalPrice(cart.totalPrice);
        this.setCustomerId(cart.customerId);
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }

    getCustomerId(): number {
        return this.customerId;
    }

    setCustomerId(customerId: number): void {
        this.customerId = customerId;
    }


}