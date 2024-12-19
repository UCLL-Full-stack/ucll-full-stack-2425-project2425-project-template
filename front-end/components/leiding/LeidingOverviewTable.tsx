import React from 'react';
import { Leiding } from '@/types';

type Props = {
    leiding: Array<Leiding>,
}

const LeidingOverviewTable: React.FC<Props> = ({ leiding }: Props) => {
    return (
        <div className="p-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-amber-600 border-b-2 border-amber-900">
                        <th scope="col" className="p-2 border-r border-amber-900">Naam</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Totem</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Gsm/Telefoon</th>
                        <th scope="col" className="p-2 border-r border-amber-900">Groep</th>
                    </tr>
                </thead>
                <tbody>
                    {leiding.map((lid, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} border-amber-900`}>
                            <td className="p-2 border-r border-amber-900">{lid.naam + " " + lid.voornaam}</td>
                            <td className="p-2 border-r border-amber-900">{lid.totem}</td>
                            <td className="p-2 border-r border-amber-900">{lid.telefoon}</td>
                            <td className="p-2 border-r border-amber-900">{lid.groep}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeidingOverviewTable;