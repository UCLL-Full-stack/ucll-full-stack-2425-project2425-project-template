import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Project } from '@types';
import Head from 'next/head';
import ProjectDetails from '@/components/projects/ProjectDetails';
import Header from '@/components/header';
import ProjectService from '@/services/ProjectService';
import ProjectOverviewTable from '@/components/projects/ProjectOverviewTable';

const ProjectPage: React.FC = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const [projects, setProjects] = useState<Array<Project>>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const response = await ProjectService.getProjectById(projectId as string);
          const data = await response.json();
          setSelectedProject(data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
      fetchProject();
    }
  }, [projectId]);

  return (
    <>
      <Head>
        <title>Project Details</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-2xl font-bold mb-8">Project Details</h1>
        <section>
          <ProjectOverviewTable projects={projects} selectProject={setSelectedProject} />
          {selectedProject ? (
            <ProjectDetails project={selectedProject} />
          ) : (
            <p>No project with this id</p>
          )}
        </section>
      </main>
    </>
  );
};

export default ProjectPage;