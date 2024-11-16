export class Order{
    private id?: number;
    private orderDate: Date;
    private deliveryDate: Date;
    private totalAmount: number;
    private status: string;

    constructor(order: {
        id?: number;
        orderDate: Date;
        deliveryDate: Date;
        totalAmount: number;
        status: string;
    }) {
        this.id = order.id;
        this.orderDate = order.orderDate;
        this.deliveryDate = order.deliveryDate;
        this.totalAmount = order.totalAmount;
        this.status = order.status;
    }

    getId(): number | undefined {
        return this.id;
    }
    getOrderDate(): Date {
        return this.orderDate;
    }
    getDeliveryDate(): Date {
        return this.deliveryDate;
    }
    getTotalAmount(): number {
        return this.totalAmount;
    }
    getStatus(): string {
        return this.status;
    }   
}
