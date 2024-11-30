
import {
    Subscription as SubscriptionPrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Type } from '../types';
import { User } from './user';

export class Subscription {
    private id?: number;
    private type: Type;
    private startDate: Date;
    private endDate: Date;
    private user: User;

    constructor(subscription: { id?: number; type: Type; startDate: Date; endDate: Date; user: User }){
        this.validate(subscription);
        this.id = subscription.id;
        this.type = subscription.type;
        this.startDate = subscription.startDate;
        this.endDate = subscription.endDate;
        this.user = subscription.user;

    };

    static from({
        id,
        type,
        startDate,
        endDate,
        user
    }: SubscriptionPrisma & { user: UserPrisma}) {
        return new Subscription({
            id,
            type: type as Type,
            startDate,
            endDate, 
            user: User.from(user),
        });
    }


    public getId(): number | undefined {
        return this.id;
    }

    public getType(): Type {
        return this.type;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getendDate(): Date {
        return this.endDate;
    }

    equals(subscription: Subscription): boolean {
        return (
            this.id === subscription.getId() &&
            this.type === subscription.getType() &&
            this.startDate === subscription.getStartDate() &&
            this.endDate === subscription.getendDate()
        );
    }

    validate(subscription: {
        id?: number;
        type: Type;
        startDate: Date;
        endDate: Date;
    }): void {
        if (!subscription.type) {
            throw new Error('subscription type is required');
        }
        if (subscription.startDate > subscription.endDate) {
            throw new Error('subscription end date cannot be before startdate');
        }

    }


}
