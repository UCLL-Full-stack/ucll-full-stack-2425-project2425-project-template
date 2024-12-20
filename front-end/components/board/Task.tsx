import { Task } from "@/types";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

interface TaskProps {
    task: Task;
    index: number;
}

const TaskComponent: React.FC<TaskProps> = ({ task, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation(['common']);

    return (
        <div
            className={`p-4 bg-gray-600 rounded-md mt-2 ${
                isExpanded ? "border-l-4 border-blue-500" : ""
            }`}
            onClick={() => setIsExpanded((prev) => !prev)}
        >
            <h3 className="font-medium">{task?.name || t('task.untitled')}</h3>
            <p className="text-sm text-gray-300">{task?.description || t('task.noDescription')}</p>
            {isExpanded && (
                <div className="mt-2 pt-2 border-t border-gray-500">
                    <p><strong>{t('task.status')}:</strong> {task?.status}</p>
                    <p><strong>{t('task.assignedTo')}:</strong> {task?.assignedTo || t('task.unassigned')}</p>
                </div>
            )}
        </div>
    );
};

export default TaskComponent;