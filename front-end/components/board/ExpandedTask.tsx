import UserService from "@/services/UserService";
import { Task } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

interface ExpandedTaskProps {
    task: Task;
}

const ExpandedTask: React.FC<ExpandedTaskProps> = ({ task }) => {
    const { t } = useTranslation(['common']);
    const [assigneeNames, setAssigneeNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchAssigneeNames = async () => {
            if (task.assignedTo) {
                const names = await Promise.all(
                    task.assignedTo.map(async (userId) => {
                        const user = await UserService.getUser(userId);
                        return user.globalName;
                    })
                );
                setAssigneeNames(names);
            }
        };

        fetchAssigneeNames();
    }, [task.assignedTo]);

    return (
        <div className="mt-2 text-gray-300">
            <p>{t('task.description')}: {task.description}</p>
            <p>{t('task.dueDate')}: {task.dueDate.toDateString()}</p>
            <p>{t('task.assignees')}: {assigneeNames.join(", ")}</p>
        </div>
    );
};

export default ExpandedTask;