import React from 'react';
import { Activiteit } from '@/types';

type Props = {
    activiteiten: Array<Activiteit>,
}

const ActiviteitenOverviewTable: React.FC<Props> = ({ activiteiten }: Props) => {
    return (
        <>
            <div className="p-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-amber-600 border-b-2 border-amber-900">
                        <th scope="col" className="p-2 border-r border-amber-900">Naam</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Beschrijving</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Begindatum</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Einddatum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activiteiten.map((activiteit, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} border-amber-900`}>
                            <td className="p-2 border-r border-amber-900">{activiteit.naam}</td>
                            <td className="p-2 border-r border-amber-900">{activiteit.beschrijving}</td>
                            <td className="p-2 border-r border-amber-900">
                                {new Date(activiteit.begindatum).toLocaleDateString()} {new Date(activiteit.begindatum).toLocaleTimeString()}
                            </td>
                            <td className="p-2 border-r border-amber-900">
                                {new Date(activiteit.einddatum).toLocaleDateString()} {new Date(activiteit.einddatum).toLocaleTimeString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ActiviteitenOverviewTable;