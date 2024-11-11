export class RecipeDetail {
    private recipeDetailId?: number;
    private totalLikes: number;
    private difficulty: number;
    private cookingTime: number;

    constructor(recipeDetail: { recipeDetailId?: number, totalLikes: number, difficulty: number, cookingTime: number }) {
        this.recipeDetailId = recipeDetail.recipeDetailId;
        this.totalLikes = recipeDetail.totalLikes;
        this.difficulty = recipeDetail.difficulty;
        this.cookingTime = recipeDetail.cookingTime;
    }

    public addLike(): void {
        this.totalLikes += 1;
    }

    public subtractLike(): void {
        this.totalLikes -= 1;
    }
}