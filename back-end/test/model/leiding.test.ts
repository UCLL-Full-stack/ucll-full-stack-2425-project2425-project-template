import { Groep } from "../../model/groep";
import { Leiding } from "../../model/leiding";

const validNaam = "leiding";
const validVoornaam = "voornaam";
const validEmail = "l@l.be";
const validTelefoon = "0123456789";
const validHoofdleiding = "HOOFDLEIDING";
const validTotem = "totem";
const validGroep = new Groep({
    id: 1,
    naam: "groep",
    beschrijving: "Dit is een groep",
    leiding: undefined,
    activiteiten: undefined
});

test("given valid parameters, when new Leiding, then Leiding is created", () => {
    const leiding = new Leiding({
        id: 1,
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
    });
    expect(leiding.getVoornaam()).toBe(validVoornaam);
    expect(leiding.getNaam()).toBe(validNaam);
    expect(leiding.getEmail()).toBe(validEmail);
    expect(leiding.getTelefoon()).toBe(validTelefoon);
    expect(leiding.getRol()).toBe(validHoofdleiding);
    expect(leiding.getTotem()).toBe(validTotem);
    expect(leiding.getGroepId()).toBe(validGroep.getId());
});

test("given valid parameters, when setVoornaam, then voornaam is set", () => {
    const leiding = new Leiding({
        id: 1,
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
    });
    const newVoornaam = "Voornaam 2";
    leiding.setVoornaam(newVoornaam);
    expect(leiding.getVoornaam()).toBe(newVoornaam);
});

test("given valid parameters, when setNaam, then naam is set", () => {
    const leiding = new Leiding({
        id: 1,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem,
    });
    const newNaam = "Naam 2";
    leiding.setNaam(newNaam);
    expect(leiding.getNaam()).toBe(newNaam);
});

test("given valid parameters, when setEmail, then email is set", () => {
    const leiding = new Leiding({
        id: 1,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem
    });
    const newEmail = "ll@ll.com";
    leiding.setEmail(newEmail);
    expect(leiding.getEmail()).toBe(newEmail);
});

test("given valid parameters, when setTelefoon, then telefoon is set", () => {
    const leiding = new Leiding({
        id: 1,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem
    });
    const newTelefoon = "9876543210";
    leiding.setTelefoon(newTelefoon);
    expect(leiding.getTelefoon()).toBe(newTelefoon);
});

test("given valid parameters, when setHoofdleiding, then hoofdleiding is set", () => {
    const leiding = new Leiding({
        id: 1,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem
    });
    const newHoofdleiding = "LEIDING";
    leiding.setRol(newHoofdleiding);
    expect(leiding.getRol()).toBe(newHoofdleiding);
});

test("given valid parameters, when setTotem, then totem is set", () => {
    const leiding = new Leiding({
        id: 1,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem
    });
    const newTotem = "Totem 2";
    leiding.setTotem(newTotem);
    expect(leiding.getTotem()).toBe(newTotem);
});

test("given valid parameters, when setGroep, then groep is set", () => {
    const leiding = new Leiding({
        id: 1,
        groepId: validGroep.getId(),
        nieuwsberichten: [],
        wachtwoord: "wachtwoord",
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        rol: validHoofdleiding,
        totem: validTotem
    });
    const newGroep = new Groep({
        id: 2,
        naam: "groep 2",
        beschrijving: "Dit is een andere groep",
        leiding: undefined,
        activiteiten: undefined
    });
    leiding.setGroepId(newGroep.getId());
    expect(leiding.getGroepId()).toBe(newGroep.getId());
});