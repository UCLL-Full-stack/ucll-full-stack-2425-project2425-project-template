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
                    <tr className="bg-green-100 border-b-2 border-green-500">
                        <th scope="col" className="p-2 border-r border-green-500">Naam</th>
                        <th scope="col" className="p-2 border-r border-green-500">Beschrijving</th>
                        <th scope="col" className="p-2 border-r border-green-500">Begindatum</th>
                        <th scope="col" className="p-2">Einddatum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activiteiten.map((activiteit, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-green-50' : 'bg-white'} border-green-500`}>
                            <td className="p-2 border-r border-green-500">{activiteit.naam}</td>
                            <td className="p-2 border-r border-green-500">{activiteit.beschrijving}</td>
                            <td className="p-2 border-r border-green-500">
                                {new Date(activiteit.begindatum).toLocaleDateString()} {new Date(activiteit.begindatum).toLocaleTimeString()}
                            </td>
                            <td className="p-2">
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