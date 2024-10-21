import { User } from './user';

export class Shoppingcart {
    private id?: number | undefined;
    private name: string;
    private deliveryDate: Date;
    private user!: User;

    constructor(shoppingcart: { id?: number; name: string; deliveryDate: Date }) {
        this.validate(shoppingcart);
        this.id = shoppingcart.id;
        this.name = shoppingcart.name;
        this.deliveryDate = shoppingcart.deliveryDate;
    }

    validate(shoppingcart: { name: string; deliveryDate: Date }) {
        if (!shoppingcart.name?.trim()) {
            throw new Error('Name is required');
        }

        if (!shoppingcart.deliveryDate || isNaN(shoppingcart.deliveryDate.getTime())) {
            throw new Error('Delivery date is required');
        }

        if (shoppingcart.deliveryDate.getTime() < Date.now()) {
            throw new Error('Delivery date should be after today');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDeliveryDate(): Date {
        return this.deliveryDate;
    }

    getUser(): User {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }

    equals(shoppingcart: Shoppingcart): boolean {
        return (
            this.id === shoppingcart.getId() &&
            this.name === shoppingcart.getName() &&
            this.deliveryDate === shoppingcart.getDeliveryDate() &&
            this.user === shoppingcart.getUser()
        );
    }
}
