import { Leiding } from "../../model/leiding";
import { Nieuwsbericht } from "../../model/nieuwsbericht";

const validTitel = "Nieuwsbericht";
const validInhoud = "Dit is een nieuwsbericht.";
const validDatum = new Date();
const validAuteur = new Leiding({
    id: 1,
    nieuwsberichten: [],
    wachtwoord: "wachtwoord",
    voornaam: "Voornaam",
    naam: "Achternaam",
    email: "l@l.be",
    telefoon: "0123456789",
    rol: "HOOFDLEIDING",
    totem: "Totem",
    groepId: 1, 
});

test("given valid parameters, when new Nieuwsbericht, then Nieuwsbericht is created", () => {
    const nieuwsbericht = new Nieuwsbericht({
        titel: validTitel,
        inhoud: validInhoud,
        datum: validDatum,
        auteur: validAuteur.getId(),
        id: 1
    });
    expect(nieuwsbericht.getTitel()).toBe(validTitel);
    expect(nieuwsbericht.getInhoud()).toBe(validInhoud);
    expect(nieuwsbericht.getDatum()).toBe(validDatum);
    expect(nieuwsbericht.getAuteur()).toBe(validAuteur.getId());
});

test("given valid parameters, when setTitel, then titel is set", () => {
    const nieuwsbericht = new Nieuwsbericht({
        titel: validTitel,
        inhoud: validInhoud,
        datum: validDatum,
        auteur: validAuteur.getId(),
        id: 1
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
        auteur: validAuteur.getId(),
        id: 1
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
        auteur: validAuteur.getId(),
        id: 1
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
        auteur: validAuteur.getId(),
        id: 1
    });
    const newAuteur = new Leiding({
        id: 2,
        voornaam: "Voornaam 2",
        naam: "Achternaam 2",
        email: "ll@l.be",
        telefoon: "0123456789",
        rol: "HOOFDLEIDING",
        totem: "Totem 2",
        groepId: 1,
        nieuwsberichten: [],
        wachtwoord: "wachtwoord"
    });
    nieuwsbericht.setAuteur(newAuteur.getId());
    expect(nieuwsbericht.getAuteur()).toBe(newAuteur.getId());
});