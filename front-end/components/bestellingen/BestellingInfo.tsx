import React from 'react';
import { Bestelling, Pokebowl } from '@/types';

type Props = {
    bestelling: Bestelling | null;
};

const BestellingInfo: React.FC<Props> = ({ bestelling }: Props) => {
    return (
        <>
            {bestelling && (
                <ul>
                    <li>Ordernummer: {bestelling.id}</li>
                    <li>Naam van de klant: {bestelling.user.voornaam + " " + bestelling.user.naam}</li>
                    <li>Datum: {bestelling.datum.toLocaleString()}</li>
                    <li>Bestelling:</li>
                    {
                        bestelling.pokebowls.map((pokebowl, key) => (
                            <ul key={key}>
                                <li>{pokebowl.naam} - €{pokebowl.prijs}</li>
                            </ul>
                        ))
                    }
                    <li className='totaalPrijs'>Totaal prijs: €{bestelling.totaalPrijs}</li>
                </ul>
            )}
        </>
    );
};

export default BestellingInfo;
