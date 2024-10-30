import { Bestelling } from "../model/bestelling";

const bestellingen: Bestelling[] = [];

const createBestelling = (bestelling: Bestelling) => {
    bestellingen.push(bestelling);
};

const getAllBestellingen = (): Bestelling[] => bestellingen;

export default { createBestelling, getAllBestellingen};