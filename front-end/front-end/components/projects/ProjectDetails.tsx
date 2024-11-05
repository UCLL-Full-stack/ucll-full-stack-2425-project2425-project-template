import React from 'react';
import { Project, Task } from '@types';
import TaskOverviewTable from '../tasks/TaskOverviewTable';
import NewTaskForm from '../tasks/NewTaskForm';
import TaskService from '@/services/TaskService';

type Props = {
    project: Project;
};

const ProjectDetails: React.FC<Props> = ({ project }) => {
    const createTask = async (projectId: string, taskName: string) => {
        try {
            await TaskService.createTask(projectId, taskName);
            // Optionally, refresh the project tasks or handle the UI update
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <h3>Tasks</h3>
            <TaskOverviewTable project={project} />
            <NewTaskForm projectId={project.id} createTask={createTask} />
        </div>
    );
};

export default ProjectDetails;