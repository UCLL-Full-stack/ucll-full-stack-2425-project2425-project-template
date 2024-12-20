import { Exercise as ExercisePrisma } from '@prisma/client';

export class Exercise {
    readonly id?: string;
    readonly name: string;
    readonly description: string;
    readonly videoLink: string;
    readonly isFavorite?: boolean;

    constructor(exercise: {
        id?: string;
        name: string;
        description: string;
        videoLink: string;
        isFavorite?: boolean;
    }) {
        this.validate(exercise); 
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.videoLink = exercise.videoLink;
        this.isFavorite = exercise.isFavorite;
    }

    validate(exercise: {
        id?: string;
        name: string;
        description: string;
        videoLink: string;
        isFavorite?: boolean;
    }) {
        if (
            !exercise.name ||
            typeof exercise.name !== 'string' ||
            exercise.name.trim().length === 0
        ) {
            throw new Error('Name is required and cannot be empty.');
        }
        if (
            !exercise.description ||
            typeof exercise.description !== 'string' ||
            exercise.description.trim().length === 0
        ) {
            throw new Error('Description is required and cannot be empty.');
        }
        if (
            !exercise.videoLink ||
            typeof exercise.videoLink !== 'string' ||
            exercise.videoLink.trim().length === 0
        ) {
            throw new Error('Video link is required and cannot be empty.');
        }
        const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
        if (!urlRegex.test(exercise.videoLink)) {
            throw new Error('Invalid Video Link: Must be a valid URL');
        }
    }

    equals({
        id,
        name,
        description,
        videoLink,
        isFavorite,
    }: {
        id: string;
        name: string;
        description: string;
        videoLink: string;
        isFavorite: boolean;
    }) {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.videoLink === videoLink &&
            this.isFavorite === isFavorite
        );
    }

    static from(exercisePrisma: ExercisePrisma) {
        return new Exercise({
            id: exercisePrisma.id,
            name: exercisePrisma.name,
            description: exercisePrisma.description,
            videoLink: exercisePrisma.videoLink,
            isFavorite: exercisePrisma.isFavorite,
        });
    }
}
