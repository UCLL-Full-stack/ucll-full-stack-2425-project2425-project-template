import { Player } from "../../model/player";

const validFirstName = "John";
const validLastName = "Doe";
const validEmail = "johndoe@ucll.be";
const validPhoneNumber = "0412345678";

test('givenValidValues_whenCreatingPlayer_thenPlayerisCreatedSuccessfully', () => {
    //given
    const validPlayer = new Player({firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber});({firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber});
    //when
    //then
    expect(validPlayer.getFirstName()).toEqual(validFirstName);
    expect(validPlayer.getLastName()).toEqual(validLastName);
    expect(validPlayer.getEmail()).toEqual(validEmail);
    expect(validPlayer.getPhoneNumber()).toEqual(validPhoneNumber);
});

test('givenInvalidFirstName_whenCreatingPlayer_thenErrorIsThrown', () => {
    //given
    const inValidPlayer = new Player({firstName: "", lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber});
    //when
    //then
    expect(() => inValidPlayer.getFirstName()).toThrow("First name can not be empty");
});