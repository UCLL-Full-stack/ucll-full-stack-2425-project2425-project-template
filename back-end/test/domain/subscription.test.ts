import { Subscription as SubscriptionPrisma } from '@prisma/client';
import { SubscriptionType } from '../../types';
import { Subscription } from '../../model/subscription';

describe('Subscription', () => {
    const validSubscriptionData = {
        id: 1,
        type: 'premium' as SubscriptionType,
        startDate: new Date('2024-01-01'),
        duration: '1 year',
    };

    test('should create a valid subscription instance', () => {
        const subscription = new Subscription(validSubscriptionData);

        expect(subscription.getId()).toBe(1);
        expect(subscription.getType()).toBe('premium');
        expect(subscription.getStartDate()).toEqual(new Date('2024-01-01'));
        expect(subscription.getDuration()).toBe('1 year');
    });

    test('should throw an error if type is missing', () => {
        const invalidData = { ...validSubscriptionData, type: '' as SubscriptionType };

        expect(() => new Subscription(invalidData)).toThrow('type is required');
    });

    test('should throw an error if startDate is missing', () => {
        const invalidData = { ...validSubscriptionData, startDate: null } as any;

        expect(() => new Subscription(invalidData)).toThrow('start_date is required');
    });

    test('should throw an error if duration is missing', () => {
        const invalidData = { ...validSubscriptionData, duration: '' };

        expect(() => new Subscription(invalidData)).toThrow('duration is required');
    });

    test('should determine equality of two subscriptions', () => {
        const subscription1 = new Subscription(validSubscriptionData);
        const subscription2 = new Subscription(validSubscriptionData);

        expect(subscription1.equals(subscription2)).toBe(true);

        const subscription3 = new Subscription({
            ...validSubscriptionData,
            duration: '6 months',
        });

        expect(subscription1.equals(subscription3)).toBe(false);
    });

    test('should create a subscription from a Prisma subscription', () => {
        const prismaSubscription: SubscriptionPrisma = {
            id: 2,
            type: 'standard',
            startDate: new Date('2024-02-01'),
            duration: '6 months',
            userId: 0
        };

        const subscription = Subscription.from(prismaSubscription);

        expect(subscription.getId()).toBe(2);
        expect(subscription.getType()).toBe('standard');
        expect(subscription.getStartDate()).toEqual(new Date('2024-02-01'));
        expect(subscription.getDuration()).toBe('6 months');
    });
});
