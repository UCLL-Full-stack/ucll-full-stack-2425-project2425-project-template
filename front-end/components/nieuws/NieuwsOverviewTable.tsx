import React from 'react';
import { Nieuwsbericht } from '@/types';

type Props = {
    nieuwsberichten: Array<Nieuwsbericht>,
}

const NieuwsOverviewTableAdmin: React.FC<Props> = ({ nieuwsberichten }: Props) => {
    return (
        <>
            <div className='p-4'>
                {nieuwsberichten.map((nieuwsbericht, index) => (
                    <div key={index} className='border-b border-gray-200 p-4 mt-5'>
                        <h2 className='text-2xl font-bold'>{nieuwsbericht.titel}</h2>
                        <p className='text-lg'>{nieuwsbericht.inhoud}</p>
                        <p className='text-sm text-right'>Stevige linker {nieuwsbericht.auteur}</p>
                        <p className='text-sm text-right'>{new Date(nieuwsbericht.datum).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default NieuwsOverviewTableAdmin;