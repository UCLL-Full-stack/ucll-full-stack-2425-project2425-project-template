import UserService from "@/services/UserService";
import { Task } from "@/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface ExpandedTaskProps {
    task: Task;
    onClose: () => void;
}

const ExpandedTask: React.FC<ExpandedTaskProps> = ({ task, onClose }) => {
    const [assigneeNames, setAssigneeNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchAssigneeNames = async () => {
            const userData = await Promise.all(
                task.assigneeIds.map((assignee) => UserService.getUser(assignee))
            );
            setAssigneeNames(userData.map((user) => user.username));
        };
        fetchAssigneeNames();
    }, [task.assigneeIds]);

    const formattedDueDate = format(new Date(task.dueDate), "MMMM d, yyyy");

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 text-white p-6 rounded-lg w-96 shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">{task.title}</h2>
                <div className="text-gray-300">
                    <p className="mb-2">
                        <strong>Description:</strong> {task.description}
                    </p>
                    <p className="mb-2">
                        <strong>Due Date:</strong> {formattedDueDate}
                    </p>
                    <p>
                        <strong>Assignees:</strong> {assigneeNames.length > 0 ? assigneeNames.join(", ") : "None"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpandedTask;
