import React from 'react';
import { Nieuwsbericht } from '@/types';

type Props = {
    nieuwsberichten: Array<Nieuwsbericht>,
}

const NieuwsOverviewTable: React.FC<Props> = ({ nieuwsberichten }: Props) => {
    return (
        <>
            <div className="p-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-amber-600 border-b-2 border-amber-900">
                        <th scope="col" className="p-2 border-r border-amber-900">Titel</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Groep</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Auteur</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nieuwsberichten.map((nieuwsbericht, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} border-amber-900`}>
                            <td className="p-2 border-r border-amber-900">{nieuwsbericht.titel}</td>
                            <td className="p-2 border-r border-amber-900">{nieuwsbericht.groep}</td>
                            <td className="p-2 border-r border-amber-900">{nieuwsbericht.auteur}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default NieuwsOverviewTable;