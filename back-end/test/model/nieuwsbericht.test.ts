import { Leiding } from "../../model/leiding";
import { Nieuwsbericht } from "../../model/nieuwsbericht";

const validTitel = "Nieuwsbericht";
const validInhoud = "Dit is een nieuwsbericht.";
const validDatum = new Date();
const validAuteur = new Leiding({
    id: 1,
    voornaam: "Voornaam",
    naam: "Achternaam",
    email: "l@l.be",
    telefoon: "0123456789",
    hoofdleiding: true,
    totem: "Totem",
    groep: undefined
});

test("given valid parameters, when new Nieuwsbericht, then Nieuwsbericht is created", () => {
    const nieuwsbericht = new Nieuwsbericht({
        titel: validTitel,
        inhoud: validInhoud,
        datum: validDatum,
        auteur: validAuteur
    });
    expect(nieuwsbericht.getTitel()).toBe(validTitel);
    expect(nieuwsbericht.getInhoud()).toBe(validInhoud);
    expect(nieuwsbericht.getDatum()).toBe(validDatum);
    expect(nieuwsbericht.getAuteur()).toBe(validAuteur);
});

test("given valid parameters, when setTitel, then titel is set", () => {
    const nieuwsbericht = new Nieuwsbericht({
        titel: validTitel,
        inhoud: validInhoud,
        datum: validDatum,
        auteur: validAuteur
    });
    const newTitel = "Nieuwsbericht 2";
    nieuwsbericht.setTitel(newTitel);
    expect(nieuwsbericht.getTitel()).toBe(newTitel);
});

test("given valid parameters, when setInhoud, then inhoud is set", () => {
    const nieuwsbericht = new Nieuwsbericht({
        titel: validTitel,
        inhoud: validInhoud,
        datum: validDatum,
        auteur: validAuteur
    });
    const newInhoud = "Dit is een ander nieuwsbericht.";
    nieuwsbericht.setInhoud(newInhoud);
    expect(nieuwsbericht.getInhoud()).toBe(newInhoud);
});

test("given valid parameters, when setDatum, then datum is set", () => {
    const nieuwsbericht = new Nieuwsbericht({
        titel: validTitel,
        inhoud: validInhoud,
        datum: validDatum,
        auteur: validAuteur
    });
    const newDatum = new Date();
    nieuwsbericht.setDatum(newDatum);
    expect(nieuwsbericht.getDatum()).toBe(newDatum);
});

test("given valid parameters, when setAuteur, then auteur is set", () => {
    const nieuwsbericht = new Nieuwsbericht({
        titel: validTitel,
        inhoud: validInhoud,
        datum: validDatum,
        auteur: validAuteur
    });
    const newAuteur = new Leiding({
        id: 2,
        voornaam: "Voornaam 2",
        naam: "Achternaam 2",
        email: "ll@l.be",
        telefoon: "0123456789",
        hoofdleiding: false,
        totem: "Totem 2",
        groep: undefined
    });
    nieuwsbericht.setAuteur(newAuteur);
    expect(nieuwsbericht.getAuteur()).toBe(newAuteur);
});