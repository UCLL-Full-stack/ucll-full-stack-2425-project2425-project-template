import recipeDb from "../repository/recipe.db"
import { Recipe } from "../model/recipe";
import {RecipeIngredientInput, RecipeInput} from "../types";

const getAllRecipes = async (): Promise<Recipe[]> => {
    return recipeDb.getAllRecipes();
}

const createRecipe = ({
                          user: userInput,
                          ingredients: RecipeIngredientInput,
                          title,
                          description,
                          instructions
}: RecipeInput) => {
    if(!userInput.getUserId()){throw new Error(`User with id ${userInput.getUserId()}`)}

    RecipeIngredientInput.map((ingredient, index) => {
        const ingededient = ingredientdb
    })
}

export default { getAllRecipes }



// const createSchedule = ({
//                             start,
//                             end,
//                             course: courseInput,
//                             lecturer: lecturerInput,
//                         }: ScheduleInput): Schedule => {
//     if (!courseInput.id) throw new Error('Course id is required');
//     if (!lecturerInput.id) throw new Error('Lecturer id is required');
//
//     if (!start || !end) {
//         throw new Error('Start and end date are required');
//     }
//
//     const course = courseDb.getCourseById({ id: courseInput.id });
//     const lecturer = lecturerDb.getLecturerById({ id: lecturerInput.id });
//
//     if (!course) throw new Error('Course not found');
//     if (!lecturer) throw new Error('Lecturer not found');
//
//     const existingSchedule = scheduleDb.getScheduleByCourseAndLecturer({
//         courseId: courseInput.id,
//         lecturerId: lecturerInput.id,
//     });
//
//     if (existingSchedule) throw new Error('This course is already scheduled for this lecturer.');
//
//     const schedule = new Schedule({ start, end, course, lecturer, students: [] });
//     return scheduleDb.createSchedule(schedule);
// };
//
// export default { createSchedule };