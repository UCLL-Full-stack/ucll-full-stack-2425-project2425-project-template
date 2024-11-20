import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProjectDetails from '@/components/projects/ProjectDetails';
import Header from '@/components/header';
import ProjectService from '@/services/ProjectService';
import ProjectOverviewTable from '@/components/projects/ProjectOverviewTable';
import TaskOverviewTable from '@/components/tasks/TaskOverviewTable';
import { Project, User, Task } from '@prisma/client';
import UserOverviewTable from '@/components/users/UserOverViewTable';
import NewTaskForm from '@/components/tasks/NewTaskForm';

const ProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [selectedProject, setSelectedProject] = useState<Project & { tasks: Task[] } | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`);
          const data = await response.json();
          setSelectedProject(data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
      fetchProject();
    }
  }, [projectId]);

  const handleTaskCreated = (newTask: Task) => {
    if (selectedProject) {
      const updatedProject = { ...selectedProject, tasks: [...selectedProject.tasks, newTask] };
      setSelectedProject(updatedProject);
    }
    setShowTaskForm(false);
  };

  const handleStatusChange = (taskId: number, newStatus: boolean) => {
    if (selectedProject) {
      const updatedTasks = selectedProject.tasks.map((task: { taskId: number; }) =>
        task.taskId === taskId ? { ...task, completed: newStatus } : task
      );
      setSelectedProject({ ...selectedProject, tasks: updatedTasks });
    }
  };
  

  return (
    <>
      <Head>
        <title>Project Details</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center bg-[#F1111]">
        <h1 className="text-2xl font-bold mb-8 text-black">
          Details of {selectedProject ? selectedProject.name : 'Project Details'}
        </h1>

        {selectedProject ? (
          <div className="flex flex-col w-full max-w-[1200px]">
            <div className="flex-1 mx-2.5 bg-white rounded-md p-4 shadow-md mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Users</h2>
                <button className="text-white bg-blue-500 px-4 py-2 rounded-md shadow hover:bg-blue-600">
                  + Add User
                </button>
              </div>
              <UserOverviewTable project={selectedProject} />
            </div>
            <div className="flex-1 mx-2.5 bg-white rounded-md p-4 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tasks</h2>
                <button
                  className="text-white bg-blue-500 px-4 py-2 rounded-md shadow hover:bg-blue-600"
                  onClick={() => setShowTaskForm(!showTaskForm)}
                >
                  + Create Task
                </button>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <TaskOverviewTable project={selectedProject} onStatusChange={handleStatusChange}/>
                </div>
                {showTaskForm && (
                  <div className="ml-4">
                    <NewTaskForm projectId={projectId as string} onTaskCreated={handleTaskCreated} onClose={() => setShowTaskForm(false)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
  
  
};

export default ProjectPage;