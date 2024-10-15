export class Cart {
    private id?: undefined | number;
    private total_price: number;
    private customer_id: number; 
    // Q& Is it not better to use setters immediately in the constructor?
    //I also thought of the same thing. I thing we could

    constructor(cart: { id?: undefined | number, total_price: number, customer_id: number }) {
        this.setId(cart.id);
        this.setTotal_price(cart.total_price);
        this.setCustomer_id(cart.customer_id);
    }

    getId(): undefined | number {
        return this.id;
    }

    setId(id: undefined | number): void {
        this.id = id;
    }

    getTotal_price(): number {
        return this.total_price;
    }

    setTotal_price(total_price: number): void {
        this.total_price = total_price;
    }

    getCustomer_id(): number {
        return this.customer_id;
    }

    setCustomer_id(customer_id: number): void {
        this.customer_id = customer_id;
    }


}