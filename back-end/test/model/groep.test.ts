import { Activiteit } from "../../model/activiteit";
import { Groep } from "../../model/groep";
import { Leiding } from "../../model/leiding";


const validNaam = "Groep 1";
const validBeschrijving = "Dit is een groep";
const validLeider = new Leiding({
    id: 1,
    voornaam: "Leider",
    naam: "Leider",
    email: "l@l.be",
    telefoon: "0123456789",
    hoofdleiding: true,
    totem: "Leider",
    groep: undefined
});
const validLeiding = [validLeider];
const validActiviteit = new Activiteit({
    id: 1,
    naam: "Activiteit",
    begindatum: new Date(),
    einddatum: new Date(),
    beschrijving: "Dit is een activiteit"
});
const validActiviteiten = [validActiviteit];

test("given valid parameters, when new Groep, then Groep is created", () => {
    const groep = new Groep({
        naam: validNaam,
        beschrijving: validBeschrijving,
        leiding: validLeiding,
        activiteiten: validActiviteiten
    });
    expect(groep.getNaam()).toBe(validNaam);
    expect(groep.getBeschrijving()).toBe(validBeschrijving);
    expect(groep.getLeiding()).toBe(validLeiding);
    expect(groep.getActiviteiten()).toBe(validActiviteiten);
});

test("given valid parameters, when setNaam, then naam is set", () => {
    const groep = new Groep({
        naam: validNaam,
        beschrijving: validBeschrijving,
        leiding: validLeiding,
        activiteiten: validActiviteiten
    });
    const newNaam = "Groep 2";
    groep.setNaam(newNaam);
    expect(groep.getNaam()).toBe(newNaam);
});

test("given valid parameters, when addActiviteit, then activiteit is added", () => {
    const groep = new Groep({
        naam: validNaam,
        beschrijving: validBeschrijving,
        leiding: validLeiding,
        activiteiten: validActiviteiten
    });
    const newActiviteit = new Activiteit({
        id: 2,
        naam: "Activiteit 2",
        begindatum: new Date(),
        einddatum: new Date(),
        beschrijving: "Dit is een activiteit"
    });
    groep.addActiviteit(newActiviteit);
    expect(groep.getActiviteiten()).toContain(newActiviteit);
    expect(groep.getActiviteiten()).toHaveLength(2);
});

test("given valid parameters, when addLeiding, then leiding is returned", () => {
    const groep = new Groep({
        naam: validNaam,
        beschrijving: validBeschrijving,
        leiding: validLeiding,
        activiteiten: validActiviteiten
    });
    const newLeiding = new Leiding({
        id: 2,
        voornaam: "Leiding",
        naam: "Leiding",
        email: "ll@l.be",
        telefoon: "0123456789",
        hoofdleiding: false,
        totem: "Leiding",
        groep: undefined
    });
    groep.addLeiding(newLeiding);
    expect(groep.getLeiding()).toContain(newLeiding);
    expect(groep.getLeiding()).toHaveLength(2);
});

test("given valid parameters, when removeLeiding, then leiding is removed", () => {
    const groep = new Groep({
        naam: validNaam,
        beschrijving: validBeschrijving,
        leiding: [validLeider],
        activiteiten: validActiviteiten
    });
    groep.removeLeiding(validLeider);
    expect(groep.getLeiding()).not.toContain(validLeider);
    expect(groep.getLeiding()).toHaveLength(0);
});

test("given valid parameters, when removeActiviteit, then activiteit is removed", () => {
    const groep = new Groep({
        naam: validNaam,
        beschrijving: validBeschrijving,
        leiding: validLeiding,
        activiteiten: [validActiviteit]
    });
    groep.removeActiviteit(validActiviteit);
    expect(groep.getActiviteiten()).not.toContain(validActiviteit);
    expect(groep.getActiviteiten()).toHaveLength(0);
});
