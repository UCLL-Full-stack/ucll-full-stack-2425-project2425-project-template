import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import ProjectService from '@/services/ProjectService';
import ProjectOverviewTable from '@/components/projects/ProjectOverviewTable';
import ProjectDetails from '@/components/projects/ProjectDetails';
import { Project } from '@types';

const IndexPage: React.FC = () => {
    const [projects, setProjects] = useState<Array<Project>>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const getProjects = async () => {
        try {
            const data = await ProjectService.fetchAndParseProjects();
            console.log('Fetched projects:', data);
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

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
                        <ProjectOverviewTable projects={projects} selectProject={setSelectedProject} />
                    ) : (
                        <p>No projects...</p>
                    )}
                    {selectedProject && (
                        <ProjectDetails project={selectedProject} />
                    )}
                </section>
            </main>
        </>
    );
};

export default IndexPage;