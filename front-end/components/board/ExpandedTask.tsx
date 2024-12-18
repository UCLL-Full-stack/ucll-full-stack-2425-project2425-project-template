import UserService from "@/services/UserService";
import { Task } from "@/types";
import { useEffect, useState } from "react";

interface ExpandedTaskProps {
    task: Task;
}

const ExpandedTask: React.FC<ExpandedTaskProps> = ({ task }) => {

    const [assigneeNames, setAssigneeNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchAssigneeNames = async () => {
            const userData = await Promise.all(
                task.assignees.map((assignee) => UserService.getUser(assignee))
            );
            setAssigneeNames(userData.map((user) => user.username));
        };
        fetchAssigneeNames();
    }, [task.assignees]);

    return (
        <div className="mt-2 text-gray-300">
            <p>Description: {task.taskDescription}</p>
            <p>Due Date: {task.dueDate.toDateString()}</p>
            <p>Assignees: {assigneeNames.join(", ")}</p>
        </div>
    );
};


export default ExpandedTask;