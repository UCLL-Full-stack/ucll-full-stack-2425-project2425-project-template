import React, { useEffect, useState } from 'react';
import { Project } from '@types';
import { Task } from '@/types';
import TaskService from '@/services/TaskService';
import NewTaskForm from '../tasks/NewTaskForm';
import ProjectService from '@/services/ProjectService';
import ProjectOverviewTable from "@/components/projects/ProjectOverviewTable";


const ProjectDetails: React.FC = () => {
    const [projects, setProjects] = useState<Array<Project>>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const getProjects = async () => {
        try {
            const response = await ProjectService.getAllProjects();
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const createTask = async (projectId: string, taskName: string) => {
        try {
          await TaskService.createTask(projectId, taskName);
          // Optionally, refresh the project tasks or handle the UI update
        } catch (error) {
          console.error('Error creating task:', error);
        }
    };
  
    return (
        <main className="d-flex flex-column justify-content-center align-items-center">
          <h1>Projects</h1>
          <section>
            <h2>Projects overview</h2>
            {projects.length > 0 ? (
              <ProjectOverviewTable projects={projects} selectProject={setSelectedProject} />
            ) : (
              <p>No projects...</p>
            )}
            {selectedProject && (
              <>
                <h2>Tasks of {selectedProject.name}</h2>
                <NewTaskForm projectId={selectedProject.id} createTask={createTask} />
                {/* Optionally, include a TaskOverviewTable to display tasks */}
              </>
            )}
          </section>
        </main>
      );
};

export default ProjectDetails;
