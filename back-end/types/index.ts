import { User } from '../model/user';
import { Exercise } from '../model/exercise';
import { Workout } from '../model/workout';
import { Profile } from '../model/profile';

type Role = 'admin' | 'user';

type ExerciseInput = {
    id?: string;
    name: string;
    description: string;
    videoLink: string;
    isFavorite: boolean;
};

type UserInput = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    profile?: Profile;
};

type WorkoutInput = {
    id?: string;
    name: string;
    description: string;
    user: User;
    exercises: Exercise[];
};

type WorkoutExerciseInput = {
    id?: string;
    sets: number;
    reps: number;
    rpe: string;
    restTime: string;
    workout: Workout;
    exercise: Exercise;
};

type TokenPayload = {
    id: string;
    email: string;
    role: Role;
};

type AuthenticationResponse = {
    id: string;
    token: string;
    email: string;
    fullname: string;
    role: string;
};

type ProfileInput = {
    id?: string;
    bio: string;
    userId: string;
};

export {
    ExerciseInput,
    UserInput,
    WorkoutInput,
    WorkoutExerciseInput,
    Role,
    TokenPayload,
    AuthenticationResponse,
    ProfileInput,
};
