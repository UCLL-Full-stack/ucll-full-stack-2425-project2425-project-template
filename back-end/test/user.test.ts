import exp from "constants";
import { User } from "../model/user";

const validUser = {
    user_id : 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "t"
}

test(`given: valid values for User properties; when: User is created; then: properties are set correctly`, () => {
    // given
    const user = new User(validUser);

    // when & then
    expect(user.user_id).toEqual(validUser.user_id);
    expect(user.firstName).toEqual(validUser.firstName);
    expect(user.lastName).toEqual(validUser.lastName);
    expect(user.email).toEqual(validUser.email);
    expect(user.password).toEqual(validUser.password);
});

test(`given: User equals method called with matching properties; when: all properties match; then: return true`, () => {
    // given 
    const user = new User(validUser);
    
    // when
    const isEqual = user.equals({
        user_id : 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "t"
    });

    // then
    expect(isEqual).toBe(true);
});

test(`given: User equals method called with non-matching properties; when: one or more properties don't match; then: return false`, () =>{
    // given
    const user = new User(validUser);
    
    // when
    const isEqual = user.equals({
        user_id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'y'
    });

    // then
    expect(isEqual).toBe(false);
});

test(`given: User equals method called; when: only one field is different; then: return false`, () => {
    //given
    const user = new User(validUser);

    //when & then
    expect(user.equals({ ...validUser, firstName: 'Jane' })).toBe(false);
    expect(user.equals({ ...validUser, lastName: 'Smith' })).toBe(false);
    expect(user.equals({ ...validUser, email: 'jane.doe@example.com' })).toBe(false);
    expect(user.equals({ ...validUser, password: 'l' })).toBe(false);
});