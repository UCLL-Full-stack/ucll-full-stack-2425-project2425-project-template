import { Project } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProjectOverviewTable from "@/components/projects/ProjectOverviewTable";
import TaskOverviewTable from "@/components/tasks/TaskOverviewTable";
import Projectservice from "@/services/ProjectService";
import Header from "@/components/header";

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Array<Project>>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    const getProjects = async () => {
        try {
            const response = await Projectservice.getAllProjects();
            const projects = await response.json();
            setProjects(projects);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
    <>
    <Head>
    <title>Projects</title>
    </Head>
    <Header />
    <main className="d-flex flex-column justify-content-center align-items-center">
    <h1>Projects</h1>
    <section>
    <h2>Projects overview</h2>
    {projects.length > 0 ? (
        <ProjectOverviewTable projects={projects} selectProject={setSelectedProject}/> 
    ) : (
        <p>No projects...</p>
    )}
    {selectedProject && (
        <>
          <h2>tasks of {selectedProject.name}</h2>
          <TaskOverviewTable project={selectedProject} />
        </>
    )}
   </section>
    </main>
    </>
    );
   };
   export default Projects;