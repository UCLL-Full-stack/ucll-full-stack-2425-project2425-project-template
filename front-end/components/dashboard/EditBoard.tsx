import BoardService from '@/services/BoardService';
import { Board, DiscordPermission, Guild, KanbanPermission, PermissionEntry, User } from '@/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface EditBoardProps {
    boardId: string;
    onClose: () => void;
    onSubmit: (data: { boardName: string}) => void;
}

const EditBoard: React.FC<EditBoardProps> = ({ boardId, onClose, onSubmit }) => {
    const [board, setBoard] = useState<Board | null>(null);
    const [boardName, setBoardName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const { t } = useTranslation(['common']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const boardData = await BoardService.getBoard(boardId);
                setBoard(boardData);
                setBoardName(boardData.boardName);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching board:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [boardId]);

    const handleSave = async () => {
        onSubmit({ boardName: boardName });
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2C2F33] p-6 rounded-lg shadow-lg w-1/2 text-white">
                <h2 className="text-2xl font-bold mb-4">
                    {t('actions.edit')}: {board?.boardName}
                </h2>

                {loading ? (
                    <p className="text-gray-400">{t("loading")}</p>
                ) : (
                    <>
                        <label className="block mb-2">
                            {t('board.edit.nameLabel')}:
                            <input
                                type="text"
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                                className="w-full p-2 mt-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </label>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={onClose}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded mr-2"
                            >
                                {t('actions.cancel')}
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                            >
                                {t('actions.save')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EditBoard;