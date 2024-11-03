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
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Competition</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditCompetitionModal;