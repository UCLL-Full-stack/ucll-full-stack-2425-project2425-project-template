import { Coach } from "../../model/coach";

const validId = 1;
const invalidId = -1;
const validFirstName = 'John';
const invalidFirstName = '';
const validLastName = 'Doe';
const invalidLastName = '';
const validEmail = 'johndoe@ucll.be';
const invalidEmail = '';
const validPhoneNumber = '0497110242';
const invalidPhoneNumber = '';

test('givenValid values_whenCreatingCoach_thenCoachIsSuccessfullyCreated', () => {
    //given

    //when
    const coach = new Coach({id: validId, firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber});

    //then
    expect(coach.getId()).toEqual(validId);
    expect(coach.getFirstName()).toEqual(validFirstName);
    expect(coach.getLastName()).toEqual(validLastName);
    expect(coach.getEmail()).toEqual(validEmail);
    expect(coach.getPhoneNumber()).toEqual(validPhoneNumber);
});

test('givenInvalidFirstName_whenCreatingCoach_thenErrorIsThrown', () => {
    //given
    //when
    //then
    expect(() => new Coach({firstName: invalidFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber})).toThrow('First name is required.');
});

test('givenInvalidLastName_whenCreatingCoach_thenErrorIsThrown', () => {
    //given
    //when
    //then
    expect(() => new Coach({firstName: validFirstName, lastName: invalidLastName, email: validEmail, phoneNumber: validPhoneNumber})).toThrow('Last name is required.');
});

test('givenInvalidEmail_whenCreatingCoach_thenErrorIsThrown', () => {
    //given
    //when
    //then
    expect(() => new Coach({firstName: validFirstName, lastName: validLastName, email: invalidEmail, phoneNumber: validPhoneNumber})).toThrow('Email is required.');
});

test('givenInvalidPhoneNumber_whenCreatingCoach_thenErrorIsThrown', () => {
    //given
    //when
    //then
    expect(() => new Coach({firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: invalidPhoneNumber})).toThrow('Phone number is required.');
});

