import { Activiteit } from "../../model/activiteit";


const validNaam = "activiteit";
const validBeschrijving = "Dit is een activiteit";
const validBegindatum = new Date();
const validEinddatum = new Date();

test("given valid parameters, when new Activiteit, then Activiteit is created", () => {
    const activiteit = new Activiteit({
        naam: validNaam,
        beschrijving: validBeschrijving,
        begindatum: validBegindatum,
        einddatum: validEinddatum
    });
    expect(activiteit.getNaam()).toBe(validNaam);
    expect(activiteit.getBeschrijving()).toBe(validBeschrijving);
    expect(activiteit.getBegindatum()).toBe(validBegindatum);
    expect(activiteit.getEinddatum()).toBe(validEinddatum);
});

test("given valid parameters, when setNaam, then naam is set", () => {
    const activiteit = new Activiteit({
        naam: validNaam,
        beschrijving: validBeschrijving,
        begindatum: validBegindatum,
        einddatum: validEinddatum
    });
    const newNaam = "Activiteit 2";
    activiteit.setNaam(newNaam);
    expect(activiteit.getNaam()).toBe(newNaam);
});

test("given valid parameters, when setBeschrijving, then beschrijving is set", () => {
    const activiteit = new Activiteit({
        naam: validNaam,
        beschrijving: validBeschrijving,
        begindatum: validBegindatum,
        einddatum: validEinddatum
    });
    const newBeschrijving = "Dit is een andere beschrijving";
    activiteit.setBeschrijving(newBeschrijving);
    expect(activiteit.getBeschrijving()).toBe(newBeschrijving);
});

test("given valid parameters, when setBegindatum, then begindatum is set", () => {
    const activiteit = new Activiteit({
        naam: validNaam,
        beschrijving: validBeschrijving,
        begindatum: validBegindatum,
        einddatum: validEinddatum
    });
    const newBegindatum = new Date();
    activiteit.setBegindatum(newBegindatum);
    expect(activiteit.getBegindatum()).toBe(newBegindatum);
});

test("given valid parameters, when setEinddatum, then einddatum is set", () => {
    const activiteit = new Activiteit({
        naam: validNaam,
        beschrijving: validBeschrijving,
        begindatum: validBegindatum,
        einddatum: validEinddatum
    });
    const newEinddatum = new Date();
    activiteit.setEinddatum(newEinddatum);
    expect(activiteit.getEinddatum()).toBe(newEinddatum);
});
