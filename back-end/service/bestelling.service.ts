import { Bestelling } from "../model/bestelling"
import bestellingDb from "../repository/bestelling.db";
import { BestellingInput } from "../types";

const createBestelling = async({ datum, totaalPrijs/* , pokebowls */ }: BestellingInput): Promise<Bestelling> => {
    const bestelling = new Bestelling({ datum, totaalPrijs/* , pokebowls */ });
    bestellingDb.createBestelling(bestelling);
    return bestelling;
}

const getAllBestellingen = async (): Promise<Bestelling[]> => bestellingDb.getAllBestellingen();

export default {createBestelling, getAllBestellingen}