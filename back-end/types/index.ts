import { User } from '../model/user';
import { Exercise } from '../model/exercise';
import { Workout } from '../model/workout';

type Role = 'admin' | 'user';

type ExerciseInput = {
    id?: string;
    name: string;
    description: string;
    videoLink: string;
    isFavorite: boolean;
};

type UserInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
};

type WorkoutInput = {
    id?: string;
    name: string;
    description: string;
    user: User;
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
    email: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: string;
};
export {
    ExerciseInput,
    UserInput,
    WorkoutInput,
    WorkoutExerciseInput,
    Role,
    TokenPayload,
    AuthenticationResponse,
};
