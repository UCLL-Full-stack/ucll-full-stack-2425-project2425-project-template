import { Activiteit } from "../model/activiteit";

const activiteiten = [
    new Activiteit({
        id: 1,
        naam: 'Activiteit 1',
        beschrijving: 'Dit is activiteit 1',
        begindatum: new Date(),
        einddatum: new Date()
    }),
    new Activiteit({
        id: 2,
        naam: 'Activiteit 2',
        beschrijving: 'Dit is activiteit 2',
        begindatum: new Date(),
        einddatum: new Date()
    }),
    new Activiteit({
        id: 3,
        naam: 'Activiteit 3',
        beschrijving: 'Dit is activiteit 3',
        begindatum: new Date(),
        einddatum: new Date()
    }),
    new Activiteit({
        id: 4,
        naam: 'Activiteit 4',
        beschrijving: 'Dit is activiteit 4',
        begindatum: new Date(),
        einddatum: new Date()
    })
];

export {activiteiten}