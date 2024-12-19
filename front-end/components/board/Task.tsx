import { Task } from "@/types";
import { useEffect, useState } from "react";
import ExpandedTask from "./ExpandedTask";
import UserService from "@/services/UserService";

interface TaskProps {
    task: Task;
    index: number;
    onTaskUpdate: (task: Task) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, index, onTaskUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpanded = (e: React.MouseEvent) => {
        if (!isExpanded) {
            e.stopPropagation();
            setIsExpanded(true);
        }
    };

    return (
        <div
            className={`p-4 bg-gray-600 rounded-md mt-2 ${
                isExpanded ? "border-l-4 border-blue-500" : ""
            }`}
            onClick={handleToggleExpanded}
        >
            <h3 className="font-medium">{task.title}</h3>
            <p>{task.description}</p>
            {isExpanded && (
                <ExpandedTask
                    task={task}
                    onClose={() => {
                        setIsExpanded(false);
                    }}
                    onTaskUpdate={onTaskUpdate}
                />
            )}
        </div>
    );
};

export default TaskComponent;