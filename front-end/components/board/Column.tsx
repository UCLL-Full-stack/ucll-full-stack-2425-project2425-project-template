import { Column, Task } from "@/types";
import TaskComponent from "./Task";
import { useEffect, useState } from "react";
import TaskService from "@/services/TaskService";

interface ColumnProps {
    column: Column;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const tasks = await Promise.all(
                column.taskIds.map((id) => TaskService.getTask(id))
            );
            setTasks(tasks);
        }
        fetchData();
    }, [column.taskIds]);

    return (
        <div className="bg-gray-700 p-4 rounded-md w-64 flex-shrink-0">
            <h3 className="font-semibold text-gray-300">{column.columnName}</h3>
            <div className="mt-4">
                {tasks.map((task, index) => (
                    <TaskComponent key={task.taskId} task={task} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ColumnComponent;