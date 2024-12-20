import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import { Activiteit } from '@/types';

const Tak: React.FC = () => {
    const [activiteiten, setActiviteiten] = useState<Array<Activiteit>>([]);
    const router = useRouter();
    const { groepNaam } = router.query;

    const formatGroupName = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formattedGroupName = groepNaam ? formatGroupName(groepNaam as string) : '';

    useEffect(() => {
        // Fetch activiteiten based on groepNaam
        if (groepNaam) {
            // Replace with your fetch logic
            fetch(`/api/activiteiten/${groepNaam}`)
                .then(response => response.json())
                .then(data => setActiviteiten(data));
        }
    }, [groepNaam]);

    return (
        <div>
            <Header />
            <h1 className='pla'>{formattedGroupName}</h1>
            {/* Render activiteiten */}
            <ul>
                {activiteiten.map(activiteit => (
                    <li key={activiteit.id}>{activiteit.naam}</li>
                ))}
            </ul>
        </div>
    );
};

export default Tak;