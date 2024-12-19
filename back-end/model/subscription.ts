import { Subscription as SubscriptionPrisma } from '@prisma/client';
import { Role, SubscriptionType } from '../types';

export class Subscription {
    private id?: number;
    private type: SubscriptionType;
    private startDate: Date;
    private duration: string;

    constructor(subscription: {
        id?: number;
        type: SubscriptionType;
        startDate: Date;
        duration: string;
    }) {
        this.validate(subscription);

        this.id = subscription.id;
        this.type = subscription.type;
        this.startDate = subscription.startDate;
        this.duration = subscription.duration;
    }

    getId(): number | undefined {
        return this.id;
    }

    getType(): SubscriptionType {
        return this.type;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getDuration(): string {
        return this.duration.toString();
    }

    validate(subscription: {
        type: SubscriptionType;
        startDate: Date;
        duration: string;
    }) {
        if (!subscription.type?.trim()) {
            throw new Error('type is required');
        }
        if (!subscription.startDate) {
            throw new Error('start_date is required');
        }
        if (!subscription.duration) {
            throw new Error('duration is required');
        }
    }

    equals(subscription: Subscription): boolean {
        return (
            this.type === subscription.getType() &&
            this.startDate === subscription.getStartDate() &&
            this.duration === subscription.getDuration()
        );
    }

    static from(subscription: SubscriptionPrisma): Subscription {
        return new Subscription({
            id: subscription.id,
            type: subscription.type as SubscriptionType,
            startDate: subscription.startDate,
            duration: subscription.duration,
        });
    }
}