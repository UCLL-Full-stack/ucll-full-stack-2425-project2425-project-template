import { Activiteit } from "../model/activiteit";
import { Groep } from "../model/groep";
import activiteitDB from "./activiteit.db";
import { leiders } from "./leiding.db";

const activiteiten = activiteitDB.activiteiten;

const groepen = [
    new Groep({
        id: 1,
        naam: 'Groep 1',
        beschrijving: 'Dit is groep 1',
        activiteiten: [activiteiten[0], activiteiten[1]],
        leiding: [leiders[0], leiders[1]]
    }),
    new Groep({
        id: 2,
        naam: 'Groep 2',
        beschrijving: 'Dit is groep 2',
        activiteiten: [activiteiten[0], activiteiten[1], activiteiten[2], activiteiten[3]],
        leiding: [leiders[2]]
    })
];

const getGroepByNaam = async (naam: string): Promise<Groep | undefined> => {
    return groepen.find((g) => g.getNaam().toLowerCase() === naam.toLowerCase());
}

const addActiviteitToGroep = async (activiteit: Activiteit, groep: Groep): Promise<Groep> => {
    groep.addActiviteit(activiteit);
    return groep;
}

export default {getGroepByNaam, addActiviteitToGroep};