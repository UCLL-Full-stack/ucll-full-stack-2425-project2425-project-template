import { User } from "../../model/user"

test("given: valid values for user, when: creating user, then: user is created", () => {
    const user = new User({ naam: "Timmermans", voornaam: "Ashley", email: "ashley.timmermans@student.ucll.be", wachtwoord: "pass", adres: "adresstraat 1", gebruikersnaam: "AshleyT", rol: "admin" })

    expect(user.getNaam()).toEqual("Timmermans");
    expect(user.getVoornaam()).toEqual("Ashley");
    expect(user.getEmail()).toEqual("ashley.timmermans@student.ucll.be");
    expect(user.getWachtwoord()).toEqual("pass");
    expect(user.getAdres()).toEqual("adresstraat 1");
    expect(user.getGebruikersnaam()).toEqual("AshleyT");
    expect(user.getRol()).toEqual("admin");
})