import ProjectService from "@/services/ProjectService";
import React, { useState } from "react";
import { Project } from "@/types";

type NewProjectFormProps = {
    onProjectCreated: (newProject: Project) => void;
};

const NewProjectForm: React.FC<NewProjectFormProps> = ({ onProjectCreated }) => {
    const [projectName, setProjectName] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!projectName) newErrors.projectName = 'Project name is required';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const newProject = await ProjectService.createProject(projectName);
            setProjectName('');
            setErrors({});
            onProjectCreated(newProject); // Pass the new project back to the parent
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="projectName">Project Name:</label>
                <input 
                    type="text" 
                    id="projectName" 
                    value={projectName} 
                    onChange={(e) => setProjectName(e.target.value)} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName}</p>}
            </div>
            <button 
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded-md shadow hover:bg-blue-600 mt-4"
            >
                Create Project
            </button>
        </form>
    );
};

export default NewProjectForm;