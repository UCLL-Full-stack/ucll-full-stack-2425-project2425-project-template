import { User } from "../../model/user"

test("given: valid values for user, when: creating user, then: user is created", () => {
    const user = new User({ naam: "Timmermans", voornaam: "Ashley", email: "ashley.timmermans@student.ucll.be", wachtwoord: "password!!", adres: "adresstraat 1", gebruikersnaam: "AshleyT", rol: "Admin" })

    expect(user.getNaam()).toEqual("Timmermans");
    expect(user.getVoornaam()).toEqual("Ashley");
    expect(user.getEmail()).toEqual("ashley.timmermans@student.ucll.be");
    expect(user.getWachtwoord()).toEqual("password!!");
    expect(user.getAdres()).toEqual("adresstraat 1");
    expect(user.getGebruikersnaam()).toEqual("AshleyT");
    expect(user.getRol()).toEqual("Admin");
});

test('given: empty naam, when: user is created, then: an error is thrown', () => {
    // given
    const emptyNaam = "";
    const voornaam = "Nina";
    const email = "nina.deweerd@student.ucll.be";
    const wachtwoord = "helloworld";
    const adres = "adresstraat 1";
    const gebruikersnaam = "NinaW";
    const rol = "Klant";

    // when
    const user = () =>
        new User({ naam: emptyNaam, voornaam: voornaam, email: email, wachtwoord: wachtwoord, adres: adres, gebruikersnaam: gebruikersnaam, rol: rol });

    // then
    expect(user).toThrow('Naam cannot be empty');
});

test('given: empty voornaam, when: user is created, then: an error is thrown', () => {
    // given
    const naam = "de Weerd";
    const emptyVoornaam = "";
    const email = "nina.deweerd@student.ucll.be";
    const wachtwoord = "helloworld";
    const adres = "adresstraat 1";
    const gebruikersnaam = "NinaW";
    const rol = "Klant";

    // when
    const user = () =>
        new User({ naam: naam, voornaam: emptyVoornaam, email: email, wachtwoord: wachtwoord, adres: adres, gebruikersnaam: gebruikersnaam, rol: rol });

    // then
    expect(user).toThrow('Voornaam cannot be empty');
});

test('given: empty email, when: user is created, then: an error is thrown', () => {
    // given
    const naam = "de Weerd";
    const voornaam = "Nina";
    const emptyEmail = "";
    const wachtwoord = "helloworld";
    const adres = "adresstraat 1";
    const gebruikersnaam = "NinaW";
    const rol = "Klant";

    // when
    const user = () =>
        new User({ naam: naam, voornaam: voornaam, email: emptyEmail, wachtwoord: wachtwoord, adres: adres, gebruikersnaam: gebruikersnaam, rol: rol });

    // then
    expect(user).toThrow('Email cannot be empty');
});

test('given: empty wachtwoord, when: user is created, then: an error is thrown', () => {
    // given
    const naam = "de Weerd";
    const voornaam = "Nina";
    const email = "nina.deweerd@student.ucll.be";
    const emptyWachtwoord = "";
    const adres = "adresstraat 1";
    const gebruikersnaam = "NinaW";
    const rol = "Klant";

    // when
    const user = () =>
        new User({ naam: naam, voornaam: voornaam, email: email, wachtwoord: emptyWachtwoord, adres: adres, gebruikersnaam: gebruikersnaam, rol: rol });

    // then
    expect(user).toThrow('Wachtwoord cannot be empty');
});

test('given: wachtwoord with less than 8 characters, when: user is created, then: an error is thrown', () => {
    // given
    const naam = "de Weerd";
    const voornaam = "Nina";
    const email = "nina.deweerd@student.ucll.be";
    const invalidWachtwoord = "hello";
    const adres = "adresstraat 1";
    const gebruikersnaam = "NinaW";
    const rol = "Klant";

    // when
    const user = () =>
        new User({ naam: naam, voornaam: voornaam, email: email, wachtwoord: invalidWachtwoord, adres: adres, gebruikersnaam: gebruikersnaam, rol: rol });

    // then
    expect(user).toThrow('Wachtwoord moet op zijn minst 8 karakters lang zijn');
});

test('given: empty adres, when: user is created, then: an error is thrown', () => {
    // given
    const naam = "de Weerd";
    const voornaam = "Nina";
    const email = "nina.deweerd@student.ucll.be";
    const wachtwoord = "helloworld";
    const emptyAdres = "";
    const gebruikersnaam = "NinaW";
    const rol = "Klant";

    // when
    const user = () =>
        new User({ naam: naam, voornaam: voornaam, email: email, wachtwoord: wachtwoord, adres: emptyAdres, gebruikersnaam: gebruikersnaam, rol: rol });

    // then
    expect(user).toThrow('Adres cannot be empty');
});

test('given: empty gebruikersnaam, when: user is created, then: an error is thrown', () => {
    // given
    const naam = "de Weerd";
    const voornaam = "Nina";
    const email = "nina.deweerd@student.ucll.be";
    const wachtwoord = "helloworld";
    const adres = "adres 1";
    const emptyGebruikersnaam = "";
    const rol = "Klant";

    // when
    const user = () =>
        new User({ naam: naam, voornaam: voornaam, email: email, wachtwoord: wachtwoord, adres: adres, gebruikersnaam: emptyGebruikersnaam, rol: rol });

    // then
    expect(user).toThrow('Gebruikersnaam cannot be empty');
});