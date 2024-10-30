import {Leiding} from "../model/leiding";

const leiders = [
    new Leiding({
        id: 1,
        naam: 'Janssens',
        voornaam: 'Jan',
        email: 'l@l.be',
        telefoon: '0123456789',
        hoofdleiding: true,
        totem: 'Totem',
        groep: undefined
    }),
    new Leiding({
        id: 2,
        naam: 'Peeters',
        voornaam: 'Piet',
        email: 'll@l.be',
        telefoon: '0123456789',
        hoofdleiding: false,
        totem: 'Totem',
        groep: undefined
    }),
    new Leiding({
        id: 3,
        naam: 'Janssens',
        voornaam: 'Jan',
        email: 'lll@l.be',
        telefoon: '0123456789',
        hoofdleiding: false,
        totem: 'Totem',
        groep: undefined
    })
];

export {leiders}