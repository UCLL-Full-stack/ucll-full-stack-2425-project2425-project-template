import { Column, Task, User } from "@/types";
import TaskComponent from "./Task";
import { useEffect, useState } from "react";
import TaskService from "@/services/TaskService";
import ColumnService from "@/services/ColumnService";
import { Droppable, Draggable } from "react-beautiful-dnd";
import GuildService from "@/services/GuildService";
import BoardService from "@/services/BoardService";
import ConfirmationModal from "../ConfirmationModal";
import { useUser } from "@/context/UserContext";

interface ColumnProps {
    column: Column;
    onDelete: (columnId: string) => void;
    onTaskChange: () => void;
    permissions: {
        canDeleteColumns: boolean;
        canEditColumns: boolean;
        canCreateTasks: boolean;
        canEditTasks: boolean;
        canDeleteTasks: boolean;
        canAssignTasks: boolean;
        canEditAssignees: boolean;
        canEditTaskStatus: boolean;
    }
}

const ColumnComponent: React.FC<ColumnProps> = ({ column, onDelete, onTaskChange, permissions }) => {
    if(column.columnId === undefined) return null;
    const {user} = useUser();
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
    const [selectedAssignees, setSelectedAssignees] = useState<User[]>([]);
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const tasks = await Promise.all(
                column.taskIds.map((id) => TaskService.getTask(id))
            );
            const sortedTasks = tasks.sort((a, b) => a.taskIndex - b.taskIndex);
            setTasks(sortedTasks);

            try {
                const board = await BoardService.getBoard(column.boardId);
                const users = await GuildService.getGuildMembers(board.guildId);
                setAvailableUsers(users);
            } catch (error) {
                console.error("Error fetching guild members:", error);
            }

        };
        fetchData();
    }, [column.taskIds]); 

    const handleBlur = async () => {
        setIsEditing(false);
        if (columnName !== initialColumnName) {
            if (!columnName.trim()) {
                setColumnName(initialColumnName);
                return;
            }
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
        setIsHovered(false);
        if(!permissions.canCreateTasks) {
            setError("You do not have permission to create tasks");
            return;
        }
        if (!newTaskTitle.trim() || !newTaskDescription.trim() || !newTaskDueDate.trim()) {
            setError("Title, description, and due date are required");
            return;
        }

        const taskPayload = {
            title: newTaskTitle.trim(),
            description: newTaskDescription.trim(),
            dueDate: new Date(newTaskDueDate),
            assigneeIds: selectedAssignees.map((user) => user.userId),
            columnId: column.columnId,
            taskIndex: tasks.length,
        };

        try {
            const newTask = await TaskService.addTask(taskPayload);
            console.log(newTask);
            setTasks((prev) => [...prev, newTask]);
            setCreatingTask(false);
            setNewTaskTitle("");
            setNewTaskDescription("");
            setNewTaskDueDate("");
            setSelectedAssignees([]);
            setError("");
            console.log("Task created successfully");
            onTaskChange();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleTaskUpdate = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskId === updatedTask.taskId ? updatedTask : task
            )
        );
    };

    const handleAddAssignee = (user: User) => {
        if (!selectedAssignees.some((assignee) => assignee.userId === user.userId)) {
            setSelectedAssignees((prev) => [...prev, user]);
        }
        setSearchQuery("");
    };

    const handleRemoveAssignee = (userId: string) => {
        setSelectedAssignees((prev) => prev.filter((user) => user.userId !== userId));
    };

    const handleTaskDelete = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    };    

    const filteredUsers = availableUsers.filter((u) => {
        const matchesSearch = u.username.toLowerCase().includes(searchQuery.toLowerCase());
        const isNotAlreadyAssigned = !selectedAssignees.some((assignee) => assignee.userId === u.userId);
        if (permissions.canEditAssignees) {
            return matchesSearch && isNotAlreadyAssigned;
        }
        if (permissions.canAssignTasks) {
            return matchesSearch && isNotAlreadyAssigned && u.userId === user!.userId;
        }
        return false;
    });

    return (
        <div
            className="bg-gray-700 p-4 rounded-md w-64 flex-shrink-0 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {permissions.canEditColumns && isEditing ? (
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
                    className={`font-semibold ${permissions.canEditColumns ? "cursor-pointer" : ""}`}
                    onClick={() => permissions.canEditColumns && setIsEditing(true)}
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
                            task.taskId && (
                                <Draggable draggableId={task.taskId} index={index} key={task.taskId} isDragDisabled={!permissions.canEditTaskStatus}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onMouseEnter={() => setIsHovered(false)}
                                            onMouseLeave={() => setIsHovered(true)}
                                        >
                                            <TaskComponent
                                                task={task}
                                                index={index}
                                                onTaskUpdate={handleTaskUpdate}
                                                onTaskDelete={handleTaskDelete}
                                                permissions={permissions}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {permissions.canDeleteColumns && isHovered && (
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                    onClick={() => setConfirmingDelete(true)}
                >
                    ✕
                </button>
            )}
            <ConfirmationModal
                isOpen={confirmingDelete}
                title="Delete Column"
                message="Are you sure you want to delete this column? All associated tasks will be deleted."
                warning="This action is irreversible."
                onConfirm={() => {
                    setConfirmingDelete(false);
                    onDelete(column.columnId);
                }}
                onCancel={() => {setConfirmingDelete(false); setIsHovered(false);}}
            />
            <div>
                {permissions.canCreateTasks && (
                    creatingTask ? (
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
                                <label className="block text-sm mb-2">Due Date:</label>
                                <input
                                    type="date"
                                    value={newTaskDueDate}
                                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                                    className="w-full p-2 mb-2 rounded-md outline-none bg-gray-600 text-white"
                                />
                                <p>Assignees:</p>
                                {selectedAssignees.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2 bg-gray-600 p-2 rounded-md">
                                        {selectedAssignees.map((assignee) => (
                                            <div
                                                key={assignee.userId}
                                                className="bg-gray-700 px-3 py-1 rounded flex items-center"
                                            >
                                                <span>{assignee.globalName}</span>
                                                <button
                                                    className="ml-2 text-gray-500 hover:text-red-600"
                                                    onClick={() => handleRemoveAssignee(assignee.userId)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        placeholder="Search users"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full p-2 rounded-md outline-none bg-gray-600 text-white"
                                    />
                                    <ul className="mt-2 bg-gray-800 rounded-md max-h-32 overflow-y-auto">
                                        {filteredUsers.map((user) => (
                                            <li
                                                key={user.userId}
                                                className="p-2 hover:bg-gray-700 cursor-pointer rounded"
                                                onClick={() => handleAddAssignee(user)}
                                            >
                                                {user.globalName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() =>{ setCreatingTask(false); setIsHovered(false);}}
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
                            onMouseEnter={() => setIsHovered(false)}
                            onMouseLeave={() => setIsHovered(true)}
                            className="w-full p-2 mt-4 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                        >
                            + Create Task
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default ColumnComponent;
