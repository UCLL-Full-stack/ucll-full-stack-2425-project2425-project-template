import React from 'react';
import { Bestelling, User } from '@/types';
import router from 'next/router';

type Props = {
    user: User | null;
    bestellingen: Array<Bestelling>;
    //selectBestelling: (bestelling: Bestelling) => void;
};

const UserInfo: React.FC<Props> = ({ user, bestellingen }: Props) => {
    return (
        <>
            <h2>Contact info</h2>
            {user && (
                <ul>
                    <li>Voornaam: {user.voornaam}</li>
                    <li>Achternaam: {user.naam}</li>
                    <li>Adres: {user.adres}</li>
                    <li>Email: {user.email}</li>
                    <li>Bestellingen:</li>
                    <ul>
                        {bestellingen && (
                            bestellingen.map((bestelling, key) => (
                                <li key={key} onClick={() => { router.push(`/bestellingen/${bestelling.id}`) }} role='button'>{bestelling.datum.toString()}</li>
                            )))
                        }
                    </ul>
                </ul>
            )}
        </>
    );
};

export default UserInfo;
