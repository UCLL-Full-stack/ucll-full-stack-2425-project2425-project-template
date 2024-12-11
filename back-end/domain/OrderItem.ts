export class OrderItem {
    constructor(
        public id: number,
        public orderId: number,
        public productId: number,
        public quantity: number,
        public finalPrice: number
    ) {}

    static from(prismaOrderItem: any): OrderItem {
        return new OrderItem(
            prismaOrderItem.id,
            prismaOrderItem.orderId,
            prismaOrderItem.productId,
            prismaOrderItem.quantity,
            prismaOrderItem.finalPrice
        );
    }

    validate() {
        if (this.quantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
        if (this.finalPrice < 0) {
            throw new Error('Final price must be a positive value.');
        }
    }
}
