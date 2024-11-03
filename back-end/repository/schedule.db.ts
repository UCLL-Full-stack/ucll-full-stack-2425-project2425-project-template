import { Schedule } from '../model/schedule';
import recipeDb from './recipe.db';

// Mock User (user1 from recipes)
const user1 = recipeDb.getAllRecipes()[0].getUser();

// Mock Schedules
const schedules: Schedule[] = [
    new Schedule({
        id: 1,
        user: user1,
        date: new Date('2024-11-03'),
        recipes: [recipeDb.getRecipeById({ id: 2 })!],
    }),
    new Schedule({
        id: 2,
        user: user1,
        date: new Date('2024-11-04'),
        recipes: [recipeDb.getRecipeById({ id: 3 })!],
    }),
    new Schedule({
        id: 3,
        user: user1,
        date: new Date('2024-11-06'),
        recipes: [recipeDb.getRecipeById({ id: 2 })!, recipeDb.getRecipeById({ id: 3 })!],
    }),
    new Schedule({
        id: 4,
        user: user1,
        date: new Date('2024-11-07'),
        recipes: [
            recipeDb.getRecipeById({ id: 1 })!,
            recipeDb.getRecipeById({ id: 4 })!,
            recipeDb.getRecipeById({ id: 5 })!,
            recipeDb.getRecipeById({ id: 6 })!,
        ],
    }),
];

const getScheduleByUserIdAndDate = (userId: number, date: Date): Schedule | null => {
    return (
        schedules.find(
            (schedule) =>
                schedule.getUser().getId() === userId &&
                schedule.getDate().toDateString() === date.toDateString()
        ) || null
    );
};

const createSchedule = (id: number, date: Date) => {
    const newSchedule = new Schedule({
        id,
        user: user1,
        date,
        recipes: [],
    });
    schedules.push(newSchedule);
    return newSchedule;
};

export default { getScheduleByUserIdAndDate, createSchedule };
