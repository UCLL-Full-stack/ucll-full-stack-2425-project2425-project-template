import { Groep } from "../model/groep";
import { activiteiten } from "./activiteit.db";
import { leiders } from "./leiding.db";

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

export default {getGroepByNaam}