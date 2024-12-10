import { Player } from "../../model/player";
import playerService from "../../service/player.service";

const validFirstName = "John";
const invalidFirstName = "";
const validLastName = "Doe";
const invalidLastName = "";
const validEmail = "johndoe@ucll.be";
const invalidEmail = "";
const validPhoneNumber = "0412345678";
const invalidPhoneNumber = "";
const validId = 1;
const invalidId = -1;


test('givenValidValues_whenCreatingPlayer_thenPlayerisCreatedSuccessfully', () => {
    //given
    const validPlayer = new Player({id: validId, firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber});({firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber});
    //when
    //then
    expect(validPlayer.getId()).toEqual(validId);
    expect(validPlayer.getFirstName()).toEqual(validFirstName);
    expect(validPlayer.getLastName()).toEqual(validLastName);
    expect(validPlayer.getEmail()).toEqual(validEmail);
    expect(validPlayer.getPhoneNumber()).toEqual(validPhoneNumber);
});

test('givenInvalidFirstName_whenCreatingPlayer_thenErrorIsThrown', () => {
    //given
    //when
    //then
        expect(() => new Player({firstName: invalidFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber})).toThrow("First name is required.");
    });

test('givenInvalidLastName_whenCreatingPlayer_thenErrorIsThrown', () => {
    //given
    //when
    //then
        expect(() => new Player({firstName: validFirstName, lastName: invalidLastName, email: validEmail, phoneNumber: validPhoneNumber})).toThrow("Last name is required.");
});

test('givenInvalidEmail_whenCreatingPlayer_thenErrorIsThrown', () => {
    //given
    //when
    //then
        expect(() => new Player({firstName: validFirstName, lastName: validLastName, email: invalidEmail, phoneNumber: validPhoneNumber})).toThrow("Email is required.");
});

test('givenInvalidPhoneNumber_whenCreatingPlayer_thenErrorIsThrown', () => {
    //given
    //when
    //then
        expect(() => new Player({firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: invalidPhoneNumber})).toThrow("Phone number is required.");
});