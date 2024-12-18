import { Task } from "@/types";
import { useEffect, useState } from "react";
import ExpandedTask from "./ExpandedTask";
import UserService from "@/services/UserService";

interface TaskProps {
    task: Task;
    index: number;
}

const TaskComponent: React.FC<TaskProps> = ({ task, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`p-4 bg-gray-600 rounded-md mt-2 ${
                isExpanded ? "border-l-4 border-blue-500" : ""
            }`}
            onClick={() => setIsExpanded((prev) => !prev)}
        >
            <h3 className="font-medium">{task.taskName}</h3>
            <p>{task.taskDescription}</p>
            {isExpanded && <ExpandedTask task={task} />}
        </div>
    );
};

export default TaskComponent;