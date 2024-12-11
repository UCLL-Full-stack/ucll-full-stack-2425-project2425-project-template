import { OrderItem } from './OrderItem';

export class Order {
    constructor(
        public id: number,
        public userId: number,
        public totalPrice: number,
        public status: OrderStatus,
        public items: OrderItem[] = []
    ) {}

    static from(prismaOrder: any): Order {
        return new Order(
            prismaOrder.id,
            prismaOrder.userId,
            prismaOrder.totalPrice,
            prismaOrder.status,
            prismaOrder.items?.map(OrderItem.from) || []
        );
    }

    validate() {
        if (this.totalPrice < 0) {
            throw new Error('Total price must be a positive value.');
        }
    }
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
}
