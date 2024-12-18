import { Column, Task } from "@/types";
import TaskComponent from "./Task";
import { useEffect, useState } from "react";
import TaskService from "@/services/TaskService";
import ColumnService from "@/services/ColumnService";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface ColumnProps {
    column: Column;
    onDelete: (columnId: string) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column, onDelete }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [columnName, setColumnName] = useState(column.columnName);
    const [initialColumnName, setInitialColumnName] = useState(column.columnName);
    const [isHovered, setIsHovered] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [creatingTask, setCreatingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDueDate, setNewTaskDueDate] = useState("");
    const [newTaskAssigneeIds, setNewTaskAssigneeIds] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const tasks = await Promise.all(
                column.taskIds.map((id) => TaskService.getTask(id))
            );
            const sortedTasks = tasks.sort((a, b) => a.taskIndex - b.taskIndex);
            setTasks(sortedTasks);
        };
        fetchData();
    }, [column.taskIds]);

    const handleBlur = async () => {
        setIsEditing(false);
        if (columnName !== initialColumnName) {
            try {
                await ColumnService.updateColumn(column.columnId, { columnName });
                setInitialColumnName(columnName);
                console.log("Column name updated successfully");
            } catch (error) {
                console.error("Error updating column name:", error);
                setColumnName(initialColumnName);
            }
        }
    };

    const handleCreateTask = async () => {
        if (!newTaskTitle.trim() || !newTaskDescription.trim() || !newTaskDueDate.trim()) {
            setError("Title, description, and due date are required");
            return;
        }

        const taskPayload = {
            title: newTaskTitle.trim(),
            description: newTaskDescription.trim(),
            dueDate: new Date(newTaskDueDate),
            assigneeIds: newTaskAssigneeIds
                .split(",")
                .map((id) => id.trim())
                .filter((id) => id),
            columnId: column.columnId,
            taskIndex: tasks.length,
        };

        try {
            const newTask = await TaskService.addTask(taskPayload);
            setTasks((prev) => [...prev, newTask]);
            setCreatingTask(false);
            setNewTaskTitle("");
            setNewTaskDescription("");
            setNewTaskDueDate("");
            setNewTaskAssigneeIds("");
            setError("");
            console.log("Task created successfully");
        } catch (error) {
            console.error("Error creating task:", error);
        }
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
            <Droppable droppableId={column.columnId} type="TASK">
                {(provided) => (
                    <div
                        className="mt-2 flex flex-col gap-2"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Draggable draggableId={task.taskId} index={index} key={task.taskId}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TaskComponent task={task} index={index} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {isHovered && (
                <button
                    className="absolute top-2 right-2 text-grey-500 hover:text-red-600"
                    onClick={() => setConfirmingDelete(true)}
                >
                    ✕
                </button>
            )}
            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg w-80 text-center">
                        <p className="text-lg font-semibold mb-4">Delete Column</p>
                        <p className="text-sm text-gray-300 mb-4">
                            Are you sure you want to delete this column? All associated tasks will be deleted.
                        </p>
                        <div className="flex justify-around mt-4">
                            <button
                                onClick={() => setConfirmingDelete(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setConfirmingDelete(false);
                                    onDelete(column.columnId);
                                }}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div>
                {creatingTask ? (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-gray-800 p-6 rounded-md w-96 text-white shadow-lg">
                            <h4 className="font-semibold mb-4">Create Task</h4>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <input
                                type="text"
                                placeholder="Title"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                className="w-full p-2 mb-2 rounded-md outline-none bg-gray-600 text-white"
                            />
                            <textarea
                                placeholder="Description"
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                                className="w-full p-2 mb-2 rounded-md outline-none bg-gray-600 text-white"
                            ></textarea>
                            <input
                                type="date"
                                value={newTaskDueDate}
                                onChange={(e) => setNewTaskDueDate(e.target.value)}
                                className="w-full p-2 mb-2 rounded-md outline-none bg-gray-600 text-white"
                            />
                            <input
                                type="text"
                                placeholder="Assignee IDs (comma-separated)"
                                value={newTaskAssigneeIds}
                                onChange={(e) => setNewTaskAssigneeIds(e.target.value)}
                                className="w-full p-2 mb-4 rounded-md outline-none bg-gray-600 text-white"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setCreatingTask(false)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateTask}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setCreatingTask(true)}
                        className="w-full p-2 mt-4 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                    >
                        + Create Task
                    </button>
                )}
            </div>
        </div>
    );
};

export default ColumnComponent;
