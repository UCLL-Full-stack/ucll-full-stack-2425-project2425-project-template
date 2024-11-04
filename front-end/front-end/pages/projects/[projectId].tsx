import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Project } from '@types';
import Head from 'next/head';
import Projectservice from "@/services/Projectservice";
import ProjectDetails from '@/components/projects/ProjectDetails';
import Header from '@/components/header';

const ProjectPage: React.FC = () => {
    const [project, setProject] = useState<Project | null>(null);
    const router = useRouter();
    const { projectId } = router.query;
    
  
    useEffect(() => {
      if (projectId) {
        const fetchProject = async () => {
          try {
            const response = await Projectservice.getProjectById(projectId as string);
            const project = await response.json();
            setProject(project);
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };
        fetchProject();
      }
    }, [projectId]);
  
    return (
      <>
        <Head>
          <title>Project Details</title>
        </Head>
        <Header />
        <main className="d-flex flex-column justify-content-center align-items-center">
          <h1>Project Details</h1>
          <section>
            {project ? (
              <ProjectDetails project={project} />
            ) : (
              <p>No project</p>
            )}
          </section>
        </main>
      </>
    );
  };
  
  export default ProjectPage;