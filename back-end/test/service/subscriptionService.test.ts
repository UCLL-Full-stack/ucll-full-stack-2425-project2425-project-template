import { User } from "../../model/user";
import subscriptionDb from "../../repository/subscription.db";
import userService from "../../service/user.service";
import { SubscriptionType } from "../../types";

const mockUser = new User({ id: 1, firstName: "Jane", lastName: "Doe", username: 'JaneDoe', email: 'jane@example.com', role: "user", password: "password123" });

let mockSubscriptionDbGetAllUsersBySubscription: jest.Mock;

beforeEach(() => {
    mockSubscriptionDbGetAllUsersBySubscription = jest.fn();
    subscriptionDb.getAllUsersBySubscription = mockSubscriptionDbGetAllUsersBySubscription;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid subscription type, when: getAllUsersBySubscription is called, then: it returns users with that subscription', async () => {
    mockSubscriptionDbGetAllUsersBySubscription.mockResolvedValue([mockUser]);

    const result = await subscriptionDb.getAllUsersBySubscription('premium');

    expect(result).toEqual([mockUser]);
    expect(mockSubscriptionDbGetAllUsersBySubscription).toHaveBeenCalledWith('premium');
});

test('given: no users with the subscription, when: getAllUsersBySubscription is called, then: it returns an empty array', async () => {
    mockSubscriptionDbGetAllUsersBySubscription.mockResolvedValue([]);

    const result = await subscriptionDb.getAllUsersBySubscription('basic');

    expect(result).toEqual([]);
    expect(mockSubscriptionDbGetAllUsersBySubscription).toHaveBeenCalledWith('basic');
});

test('given: invalid subscription type, when: getAllUsersBySubscription is called, then: it throws an error', async () => {
    mockSubscriptionDbGetAllUsersBySubscription.mockRejectedValue(new Error('Invalid subscription type'));

    await expect(subscriptionDb.getAllUsersBySubscription('invalid-type' as SubscriptionType))
        .rejects
        .toThrow('Invalid subscription type');
    expect(mockSubscriptionDbGetAllUsersBySubscription).toHaveBeenCalledWith('invalid-type');
});
