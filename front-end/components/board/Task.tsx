import { Task } from "@/types";
import { useEffect, useState } from "react";
import ExpandedTask from "./ExpandedTask";
import ConfirmationModal from "../ConfirmationModal";
import UserService from "@/services/UserService";
import TaskService from "@/services/TaskService";
import { useTranslation } from "react-i18next";

interface TaskProps {
    task: Task;
    index: number;
    onTaskUpdate: (task: Task) => void;
    onTaskDelete: (taskId: string) => void;
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

const TaskComponent: React.FC<TaskProps> = ({ task, index, onTaskUpdate, onTaskDelete, permissions }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const { t } = useTranslation(["common"]);

    const handleToggleExpanded = (e: React.MouseEvent) => {
        if (!isExpanded && !isConfirmingDelete) {
            e.stopPropagation();
            setIsExpanded(true);
            setIsHovered(false);
        }
    };

    const handleDeleteTask = async () => {
        try {
            await TaskService.deleteTask(task.taskId);
            console.log("Task deleted successfully");
            onTaskDelete(task.taskId);
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setIsConfirmingDelete(false);
        }
    };

    return (
        <div
            className={`p-4 bg-gray-600 rounded-md mt-2 ${
                isExpanded ? "border-l-4 border-blue-500" : ""
            }`}
            onClick={handleToggleExpanded}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-center">
                <h3 className="font-medium">{task.title}</h3>
                {isHovered && permissions.canDeleteTasks&& (
                    <button
                        className="text-gray-500 hover:text-red-600"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsConfirmingDelete(true);
                        }}
                    >
                        ✕
                    </button>
                )}
            </div>            
            <p>{task.description}</p>
            {isExpanded && (
                <ExpandedTask
                    task={task}
                    onClose={() => {
                        setIsExpanded(false);
                    }}
                    onTaskUpdate={onTaskUpdate}
                    onTaskDelete={(taskId) => {
                        onTaskDelete(taskId);
                        setIsExpanded(false);
                    }}
                    permissions={permissions}
                />
            )}
            <ConfirmationModal
                isOpen={isConfirmingDelete}
                title={t("task.delete")}
                message={t("task.deleteConfirm")}
                onConfirm={handleDeleteTask}
                onCancel={() => {setIsConfirmingDelete(false); setIsHovered(false)} }
            />
        </div>
    );
};

export default TaskComponent;