import { Coach } from "../../model/coach";

const validFirstName = 'Test';
const validLastName = 'Coach';
const validEmail = 'testcoach@teamtrack.com';
const validPhoneNumber = '0497110242';

test('given: valid values, when: creating a coach, then: coach is successfully created', () => {
    //given

    //when
    const coach = new Coach({firstName: validFirstName, lastName: validLastName, email: validEmail, phoneNumber: validPhoneNumber});

    //then
    expect(coach.getFirstName()).toEqual(validFirstName);
    expect(coach.getLastName()).toEqual(validLastName);
    expect(coach.getEmail()).toEqual(validEmail);
    expect(coach.getPhoneNumber()).toEqual(validPhoneNumber);
})