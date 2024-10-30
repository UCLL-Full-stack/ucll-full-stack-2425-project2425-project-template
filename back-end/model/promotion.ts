import {Order} from './order';


export class Promotion {
    private id?: number;
    private Code: string;
    private IsActive: boolean;
    private DiscountAmount: number;
    private orders: Order[];

    constructor(promotion: {
        id?: number;
        Code: string;
        IsActive: boolean;
        DiscountAmount: number;
        orders: Order[];
    }) {
        this.validate(promotion);

        this.Code = promotion.Code;
        this.IsActive = promotion.IsActive;
        this.DiscountAmount = promotion.DiscountAmount;
        this.orders = promotion.orders;
        this.id = promotion.id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getCode(): string {
        return this.Code;
    }
    getIsActive(): boolean {
        return this.IsActive;
    }
    getDiscountAmount(): number {
        return this.DiscountAmount;
    }

    getOrders(): Order[] {
        return this.orders;
    }

    validate(promotion: { Code: string; IsActive: boolean; DiscountAmount: number; orders: Order[];}) {
        if (!promotion.Code) {
            throw new Error('Code is required');
        }
        if (!promotion.IsActive) {
            throw new Error('IsActive is required');
        }
        if (!promotion.DiscountAmount) {
            throw new Error('DiscountAmount are required');
        }
        if (!promotion.orders) {
            throw new Error('Orders are required');
        }
    }

    equals(promotion: Promotion): boolean {
        return (
            this.id === promotion.getId() &&
            this.Code === promotion.getCode() &&
            this.IsActive === promotion.getIsActive() &&
            this.DiscountAmount === promotion.getDiscountAmount() &&
            this.orders.every((order, index) => order.equals(promotion.getOrders()[index]))
        );
    }
}
