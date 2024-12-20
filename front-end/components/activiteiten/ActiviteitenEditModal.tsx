import React, { useState } from 'react';
import ActiviteitService from '@/services/ActiviteitenService';
import { Activiteit } from '@/types';

type Props = {
    groepNaam: string;
    activiteit: Activiteit;
    onClose: () => void;
    onEdit: (activiteit: Activiteit) => void;
};

const ActiviteitenEditModal: React.FC<Props> = ({ groepNaam, activiteit, onClose, onEdit }) => {
    const [editedActiviteit, setEditedActiviteit] = useState({
        name: activiteit.naam,
        description: activiteit.beschrijving,
        beginDate: new Date(activiteit.begindatum).toISOString().slice(0, 16),
        endDate: new Date(activiteit.einddatum).toISOString().slice(0, 16)
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

        if (editedActiviteit.name === '') {
            setNameError('Naam is verplicht.');
            valid = false;
        }
        if (editedActiviteit.description === '') {
            setDescriptionError('Beschrijving is verplicht.');
            valid = false;
        }
        if (editedActiviteit.beginDate === '') {
            setBeginDateError('Begindatum is verplicht.');
            valid = false;
        }
        if (editedActiviteit.endDate === '') {
            setEndDateError('Einddatum is verplicht.');
            valid = false;
        }
        return valid;
    };

    const editActiviteit = async () => {
        if (!validate()) return;

        try {
            const updatedActiviteit = await ActiviteitService.updateActiviteit(
                groepNaam,
                activiteit.id,
                editedActiviteit.name,
                editedActiviteit.description,
                new Date(editedActiviteit.beginDate),
                new Date(editedActiviteit.endDate)
            );
            onEdit(updatedActiviteit);
            onClose();
        } catch (error) {
            console.error('Failed to edit activiteit:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-300 p-6 rounded-lg w-5/12 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Activiteit bewerken</h2>
                <label className="block mb-3">
                    Naam:
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        value={editedActiviteit.name}
                        onChange={(e) => setEditedActiviteit({ ...editedActiviteit, name: e.target.value })}
                    />
                    {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                </label>
                <label className="block mb-3">
                    Beschrijving:
                    <textarea
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        rows={4}
                        value={editedActiviteit.description}
                        onChange={(e) => setEditedActiviteit({ ...editedActiviteit, description: e.target.value })}
                    />
                    {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
                </label>
                <label className="block mb-3">
                    Begindatum en uur:
                    <input
                        type="datetime-local"
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        value={editedActiviteit.beginDate}
                        onChange={(e) => setEditedActiviteit({ ...editedActiviteit, beginDate: e.target.value })}
                    />
                    {beginDateError && <p className="text-red-500 text-sm">{beginDateError}</p>}
                </label>
                <label className="block mb-3">
                    Einddatum en uur:
                    <input
                        type="datetime-local"
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200 shadow-md"
                        value={editedActiviteit.endDate}
                        onChange={(e) => setEditedActiviteit({ ...editedActiviteit, endDate: e.target.value })}
                    />
                    {endDateError && <p className="text-red-500 text-sm">{endDateError}</p>}
                </label>
                <div className="text-center">
                    <button
                        className="bg-green-900 text-white px-4 py-2 rounded shadow-md hover:bg-green-950 mr-2"
                        onClick={editActiviteit}>Opslaan
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

export default ActiviteitenEditModal;