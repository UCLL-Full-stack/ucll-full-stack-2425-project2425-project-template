import React, { useState, useEffect } from 'react';
import { Competition } from '@/types';

interface EditCompetitionModalProps {
    competition: Competition | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (competition: Competition) => void;
}

const EditCompetitionModal: React.FC<EditCompetitionModalProps> = ({ competition, isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (competition) {
            setName(competition.name);
        }
    }, [competition]);

    const handleSave = () => {
        if (competition) {
            onSave({ ...competition, name });
        }
    };

    if (!isOpen || !competition) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Competition</h2>
                <label className="block mb-4">
                    <span className="text-gray-700">Name:</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCompetitionModal;