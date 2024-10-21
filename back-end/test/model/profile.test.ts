import Profile from "../../model/profile";

// Global constants for valid inputs
const validEmail = "test@example.com";
const validName = "John";
const validLastName = "Doe";

test('given valid values; when creating a profile; then it should create the profile correctly', () => {
    // given
    const profileData = { email: validEmail, name: validName, lastname: validLastName };

    // when
    const newProfile = new Profile(profileData);

    // then
    expect(newProfile.getEmail()).toBe(validEmail);
    expect(newProfile.name).toBe(validName);
    expect(newProfile.lastname).toBe(validLastName);
});

test('given invalid email; when creating a profile; then it should throw an error', () => {
    // given
    const invalidEmail = "invalidemail" as any;

    // when & then
    expect(() => {
        new Profile({ email: invalidEmail, name: validName, lastname: validLastName });
    }).toThrow('Invalid email value');
});

test('given email longer than 60 characters; when creating a profile; then it should throw an error', () => {
    // given
    const longEmail = "a".repeat(61) + "@example.com";

    // when & then
    expect(() => {
        new Profile({ email: longEmail, name: validName, lastname: validLastName });
    }).toThrow('Invalid email value');
});

test('given invalid name; when creating a profile; then it should throw an error', () => {
    // given
    const invalidName = 123 as any;

    // when & then
    expect(() => {
        new Profile({ email: validEmail, name: invalidName, lastname: validLastName });
    }).toThrow('Invalid name value');
});

test('given name longer than 40 characters; when creating a profile; then it should throw an error', () => {
    // given
    const longName = "a".repeat(41);

    // when & then
    expect(() => {
        new Profile({ email: validEmail, name: longName, lastname: validLastName });
    }).toThrow('Invalid name value');
});

test('given invalid lastname; when creating a profile; then it should throw an error', () => {
    // given
    const invalidLastname = 123 as any;

    // when & then
    expect(() => {
        new Profile({ email: validEmail, name: validName, lastname: invalidLastname });
    }).toThrow('Invalid lastname value');
});

test('given lastname longer than 60 characters; when creating a profile; then it should throw an error', () => {
    // given
    const longLastname = "a".repeat(61);

    // when & then
    expect(() => {
        new Profile({ email: validEmail, name: validName, lastname: longLastname });
    }).toThrow('Invalid lastname value');
});

test('given valid profile; when getting full name; then it should return the correct full name', () => {
    // given
    const newProfile = new Profile({ email: validEmail, name: validName, lastname: validLastName });

    // when
    const fullName = newProfile.getFullName();

    // then
    expect(fullName).toBe("John Doe");
});

test('given valid profile; when getting abbreviated name; then it should return the correct abbreviated name', () => {
    // given
    const newProfile = new Profile({ email: validEmail, name: validName, lastname: validLastName });

    // when
    const abbreviatedName = newProfile.getAbbreviatedName();

    // then
    expect(abbreviatedName).toBe("JD");
});

test('given valid new name; when updating the name; then it should update the name correctly', () => {
    // given
    const newProfile = new Profile({ email: validEmail, name: validName, lastname: validLastName });
    const newName = "Jane";

    // when
    newProfile.setName(newName);

    // then
    expect(newProfile.name).toBe(newName);
});

test('given valid new lastname; when updating the lastname; then it should update the lastname correctly', () => {
    // given
    const newProfile = new Profile({ email: validEmail, name: validName, lastname: validLastName });
    const newLastname = "Smith";

    // when
    newProfile.setLastName(newLastname);

    // then
    expect(newProfile.lastname).toBe(newLastname);
});
