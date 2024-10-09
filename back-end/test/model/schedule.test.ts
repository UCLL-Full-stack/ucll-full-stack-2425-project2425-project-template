import { Recipe } from '../../model/recipe';
import { Schedule } from '../../model/schedule';
import { User } from '../../model/user';

const date1: Date = new Date(2024, 9, 1, 10, 0);

const user1: User = new User({ username: 'test user', password: 'str!ngP@ss123' });

const recipe1: Recipe = new Recipe({
    title: 'pasta carbonara',
    instructions: 'easy instructions',
    cookingTime: 30,
    category: 'dinner',
});

const schedule: Schedule = new Schedule({
    date: date1,
    user: user1,
    recipe: recipe1,
});

test('given: valid values for schedule, when: schedule is created, then: schedule is created with those values', () => {
    expect(schedule.getDate()).toBe(date1);
    expect(schedule.getRecipe()).toBe(recipe1);
    expect(schedule.getUser()).toBe(user1);
});
