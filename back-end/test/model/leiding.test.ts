import { Groep } from "../../model/groep";
import { Leiding } from "../../model/leiding";

const validNaam = "leiding";
const validVoornaam = "voornaam";
const validEmail = "l@l.be";
const validTelefoon = "0123456789";
const validHoofdleiding = true;
const validTotem = "totem";
const validGroep = new Groep({
    naam: "groep",
    beschrijving: "Dit is een groep",
    leiding: undefined,
    activiteiten: undefined
});

test("given valid parameters, when new Leiding, then Leiding is created", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    expect(leiding.getVoornaam()).toBe(validVoornaam);
    expect(leiding.getNaam()).toBe(validNaam);
    expect(leiding.getEmail()).toBe(validEmail);
    expect(leiding.getTelefoon()).toBe(validTelefoon);
    expect(leiding.getHoofdleiding()).toBe(validHoofdleiding);
    expect(leiding.getTotem()).toBe(validTotem);
    expect(leiding.getGroep()).toBe(validGroep);
});

test("given valid parameters, when setVoornaam, then voornaam is set", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    const newVoornaam = "Voornaam 2";
    leiding.setVoornaam(newVoornaam);
    expect(leiding.getVoornaam()).toBe(newVoornaam);
});

test("given valid parameters, when setNaam, then naam is set", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    const newNaam = "Naam 2";
    leiding.setNaam(newNaam);
    expect(leiding.getNaam()).toBe(newNaam);
});

test("given valid parameters, when setEmail, then email is set", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    const newEmail = "ll@ll.com";
    leiding.setEmail(newEmail);
    expect(leiding.getEmail()).toBe(newEmail);
});

test("given valid parameters, when setTelefoon, then telefoon is set", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    const newTelefoon = "9876543210";
    leiding.setTelefoon(newTelefoon);
    expect(leiding.getTelefoon()).toBe(newTelefoon);
});

test("given valid parameters, when setHoofdleiding, then hoofdleiding is set", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    const newHoofdleiding = false;
    leiding.setHoofdleiding(newHoofdleiding);
    expect(leiding.getHoofdleiding()).toBe(newHoofdleiding);
});

test("given valid parameters, when setTotem, then totem is set", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    const newTotem = "Totem 2";
    leiding.setTotem(newTotem);
    expect(leiding.getTotem()).toBe(newTotem);
});

test("given valid parameters, when setGroep, then groep is set", () => {
    const leiding = new Leiding({
        voornaam: validVoornaam,
        naam: validNaam,
        email: validEmail,
        telefoon: validTelefoon,
        hoofdleiding: validHoofdleiding,
        totem: validTotem,
        groep: validGroep
    });
    const newGroep = new Groep({
        naam: "groep 2",
        beschrijving: "Dit is een andere groep",
        leiding: undefined,
        activiteiten: undefined
    });
    leiding.setGroep(newGroep);
    expect(leiding.getGroep()).toBe(newGroep);
});