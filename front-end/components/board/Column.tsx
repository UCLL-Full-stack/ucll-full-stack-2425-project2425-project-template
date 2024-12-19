import { Column, Task } from "@/types";
import TaskComponent from "./Task";
import { useEffect, useState } from "react";
import TaskService from "@/services/TaskService";
import ColumnService from "@/services/ColumnService";
import { useTranslation } from 'react-i18next';

interface ColumnProps {
    column: Column;
    onDelete: (columnId: string) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column, onDelete }) => {
    const { t } = useTranslation(['common']);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [columnName, setColumnName] = useState(column.columnName);
    const [initialColumnName, setInitialColumnName] = useState(column.columnName);
    const [isHovered, setIsHovered] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const tasks = await Promise.all(
                column.taskIds.map((id) => TaskService.getTask(id))
            );
            setTasks(tasks);
        }
        fetchData();
    }, [column.taskIds]);

    const handleBlur = async () => {
        setIsEditing(false);
        if (columnName !== initialColumnName) {
            try {
                await ColumnService.updateColumn(column.columnId, { columnName });
                setInitialColumnName(columnName);
                console.log(t('column.updateSuccess'));
            } catch (error) {
                console.error(t('column.updateError'), error);
                setColumnName(initialColumnName);
            }
        }
    };

    const handleDelete = () => {
        setConfirmingDelete(false);
        onDelete(column.columnId);
    };

    return (
        <div
            className="bg-gray-700 p-4 rounded-md w-64 flex-shrink-0 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isEditing ? (
                <input
                    type="text"
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                    onBlur={handleBlur}
                    className="font-semibold bg-transparent border-b-2 border-blue-500 outline-none w-full"
                    autoFocus
                />
            ) : (
                <h3
                    className="font-semibold cursor-pointer"
                    onClick={() => setIsEditing(true)}
                >
                    {columnName}
                </h3>
            )}
            
            <div className="mt-4 space-y-2">
                {tasks.map((task, index) => (
                    <TaskComponent key={task.taskId} task={task} index={index} />
                ))}
            </div>

            {isHovered && (
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => setConfirmingDelete(true)}
                    title={t('delete Tooltip')}
                >
                    ✕
                </button>
            )}

            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg w-80 text-center">
                        <p className="text-lg font-semibold mb-4">
                            {t(' Title delete')}
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                            {t(' Confirm delete')}
                        </p>
                        <div className="flex justify-around mt-4">
                            <button
                                onClick={() => setConfirmingDelete(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                            >
                                {t('delete')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColumnComponent;