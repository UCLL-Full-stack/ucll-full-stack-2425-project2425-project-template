import React, { useState } from 'react';
import ActiviteitService from '@/services/ActiviteitenService';
import { Activiteit } from '@/types';

type Props = {
    groepNaam: string;
    onClose: () => void;
    onAdd: (activiteit: Activiteit) => void;
};

const ActiviteitenAddModal: React.FC<Props> = ({ groepNaam, onClose, onAdd }) => {
    const [newActiviteit, setNewActiviteit] = useState({
        name: '',
        description: '',
        beginDate: '',
        endDate: ''
    });
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [beginDateError, setBeginDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');

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
            const response = await ActiviteitService.addActiviteit(
                groepNaam,
                newActiviteit.name,
                newActiviteit.description,
                new Date(newActiviteit.beginDate),
                new Date(newActiviteit.endDate)
            );
            onAdd(response);
            onClose();
        } catch (error) {
            console.error('Failed to add activiteit:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-300 p-6 rounded-lg w-5/12 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Activiteit toevoegen</h2>
                <label className="block mb-3">
                    Naam:
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        value={newActiviteit.name}
                        onChange={(e) => setNewActiviteit({ ...newActiviteit, name: e.target.value })}
                    />
                    {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                </label>
                <label className="block mb-3">
                    Beschrijving:
                    <textarea
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        value={newActiviteit.description}
                        onChange={(e) => setNewActiviteit({ ...newActiviteit, description: e.target.value })}
                    />
                    {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
                </label>
                <label className="block mb-3">
                    Begindatum en uur:
                    <input
                        type="datetime-local"
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        value={newActiviteit.beginDate}
                        onChange={(e) => setNewActiviteit({ ...newActiviteit, beginDate: e.target.value })}
                    />
                    {beginDateError && <p className="text-red-500 text-sm">{beginDateError}</p>}
                </label>
                <label className="block mb-3">
                    Einddatum en uur:
                    <input
                        type="datetime-local"
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        value={newActiviteit.endDate}
                        onChange={(e) => setNewActiviteit({ ...newActiviteit, endDate: e.target.value })}
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
                        onClick={onClose}>Annuleren
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActiviteitenAddModal;