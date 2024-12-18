import React, { useState } from 'react';
import { Activiteit } from '@/types';
import ActiviteitenService from '../../services/ActiviteitenService';
import ActiviteitService from '@/services/ActiviteitenService';

type Props = {
    activiteiten: Array<Activiteit>,
}

const ActiviteitenOverviewTable: React.FC<Props> = ({ activiteiten }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newActiviteit, setNewActiviteit] = useState({
        name: '',
        description: '',
        beginDate: new Date().toLocaleDateString(),
        endDate: new Date().toLocaleDateString()
    });
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [beginDateError, setBeginDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');

    const getActiviteiten = async () => {
        const response = await ActiviteitService.getAllActiviteiten();
        const activiteiten = await response.json();
        setActiviteiten(activiteiten);
    }

    const validate = (): boolean => {
        let valid = true;
        setNameError('');
        setDescriptionError('');
        setBeginDateError('');
        setEndDateError('');

        if (newActiviteit.name === '') {
            setNameError('Naam is verplicht.');
            valid = false;
        }
        if (newActiviteit.description === '') {
            setDescriptionError('Beschrijving is verplicht.');
            valid = false;
        }
        if (newActiviteit.beginDate === '') {
            setBeginDateError('Begindatum is verplicht.');
            valid = false;
        }
        if (newActiviteit.endDate === '') {
            setEndDateError('Einddatum is verplicht.');
            valid = false;
        }
        return valid;
    };

    const addActiviteit = async () => {
        if (!validate()) return;

        try {
            await ActiviteitenService.addActiviteit(newActiviteit.name, newActiviteit.description, new Date(newActiviteit.beginDate), new Date(newActiviteit.endDate));
            setShowModal(false);
            setNewActiviteit({ name: '', description: '', beginDate: '', endDate: '' });
            await getActiviteiten();
        } catch (error) {
            console.error('Activiteit toevoegen mislukt.:', error);
        }
    };

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

            {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-gray-300 p-6 rounded-lg w-96 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Activiteit toevoegen</h2>
                    <label className="block mb-3">
                        Naam:
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                            value={newActiviteit.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                    </label>
                    <label className="block mb-3">
                        Beschrijving:
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                            value={newActiviteit.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
                    </label>
                    <label className="block mb-3">
                        Begindatum en uur:
                        <input
                            type="datetime-local"
                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                            value={newActiviteit.beginDate}
                            onChange={(e) => setBeginDate(e.target.value)}
                        />
                        {beginDateError && <p className="text-red-500 text-sm">{beginDateError}</p>}
                    </label>
                    <label className="block mb-3">
                        Einddatum en uur:
                        <input
                            type="datetime-local"
                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                            value={newActiviteit.endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        {endDateError && <p className="text-red-500 text-sm">{endDateError}</p>}
                    </label>
                    <div className="text-center">
                        <button
                            className="bg-green-900 text-white px-4 py-2 rounded shadow-md hover:bg-green-950 mr-2"
                            onClick={addActiviteit}>Toevoegen
                        </button>
                        <button
                            className="bg-amber-800 text-white px-4 py-2 rounded shadow-md hover:bg-amber-900"
                            onClick={() => {
                                setName('');
                                setDescription('');
                                setBeginDate(new Date().toLocaleDateString());
                                setEndDate(new Date().toLocaleDateString());
                                setNameError('');
                                setDescriptionError('');
                                setBeginDateError('');
                                setEndDateError('');
                                onClick={() => setShowModal(false)}
                            }}>Annuleren
                        </button>
                    </div>
                </div>
            </div>
            )}
        </>
    );
};

export default ActiviteitenOverviewTable;