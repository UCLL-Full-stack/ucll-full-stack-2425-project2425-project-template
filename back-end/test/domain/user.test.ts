import { Subscription } from "../../model/subscription";
import { User } from "../../model/user";
import { Role } from "../../types";

const validSubscription = new Subscription({
    id: 1,
    startDate: new Date("2023-01-01"),
    duration: "12 months",
    type: 'premium'
});

const validUser = {
    id: 1,
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "user" as Role,
    password: "Password1",
    subscription: validSubscription,
};

test('given valid values for User, when User is created, then User is created with those values', () => {
    const user = new User(validUser);

    expect(user.getId()).toEqual(1);
    expect(user.getUsername()).toEqual("johndoe");
    expect(user.getFirstName()).toEqual("John");
    expect(user.getLastName()).toEqual("Doe");
    expect(user.getEmail()).toEqual("john.doe@example.com");
    expect(user.getRole()).toEqual("user");
    expect(user.getPassword()).toEqual("Password1");
    expect(user.getSubscription()).toEqual(validSubscription);
});

test('given a missing username, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, username: "" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Username is required');
});

test('given a missing first name, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, firstName: "" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('First name is required');
});

test('given a missing last name, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, lastName: "" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Last name is required');
});

test('given a missing email, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, email: "" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Email is required');
});

test('given a missing password, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, password: "" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Password is required');
});

test('given two User objects with the same values, when equals is called, then returns true', () => {
    const user1 = new User(validUser);
    const user2 = new User(validUser);

    expect(user1.equals(user2)).toBe(true);
});

test('given two User objects with different values, when equals is called, then returns false', () => {
    const user1 = new User(validUser);
    const user2 = new User({ ...validUser, email: "jane.doe@example.com" });

    expect(user1.equals(user2)).toBe(false);
});

test('when id is set, then getId returns the correct value', () => {
    const user = new User(validUser);

    expect(user.getId()).toEqual(1);
});

test('when id is not set, then getId returns undefined', () => {
    const user = new User({ ...validUser, id: undefined });

    expect(user.getId()).toBeUndefined();
});

test('when getting subscription, then correct subscription is returned', () => {
    const user = new User(validUser);

    expect(user.getSubscription()).toEqual(validSubscription);
});

test('when creating User from Prisma, then values are mapped correctly', () => {
    const prismaUser = {
        id: 1,
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "user" as Role,
        password: "Password1",
        subscription: {
            id: 1,
            type: "Premium",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-12-31"),
            userId: 1,
            duration: "12 months"
        },
    };

    const user = User.from(prismaUser);

    expect(user.getId()).toEqual(1);
    expect(user.getUsername()).toEqual("johndoe");
    expect(user.getFirstName()).toEqual("John");
    expect(user.getLastName()).toEqual("Doe");
    expect(user.getEmail()).toEqual("john.doe@example.com");
    expect(user.getRole()).toEqual("user");
    expect(user.getPassword()).toEqual("Password1");
    expect(user.getSubscription()?.getId()).toEqual(1);
});