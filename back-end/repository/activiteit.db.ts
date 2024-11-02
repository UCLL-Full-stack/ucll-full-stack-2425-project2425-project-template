import { Activiteit } from "../model/activiteit";
import { Groep } from "../model/groep";

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

const addActiviteitToPool = async (activiteit: Activiteit): Promise<Activiteit> => {
    let i = 1;
    let notFound = true;
    while (notFound) {
        const n = activiteiten.length;
        let amount = 0;
        for (let nActiviteit of activiteiten) {
            if (nActiviteit.getId() !== i) {
                amount++;
            }
        }
        if (amount === n) {
            notFound = false;
            activiteit = new Activiteit({
                id: i,
                naam: activiteit.getNaam(),
                beschrijving: activiteit.getBeschrijving(),
                begindatum: activiteit.getBegindatum(),
                einddatum: activiteit.getEinddatum()
            });
        } else {
            i++;
        }
    }
    activiteiten.push(activiteit);
    return activiteit;
}

export default {activiteiten, addActiviteitToPool};