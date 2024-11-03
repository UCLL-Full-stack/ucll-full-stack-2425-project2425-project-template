export class RecipeDetail {
    private recipedetailid?: number;
    private totallikes: number;
    private difficulty: number;
    private cookingtime: number;

    constructor(recipedetail: { recipedetailid?: number, totallikes: number, difficulty: number, cookingtime: number }) {
        this.recipedetailid = recipedetail.recipedetailid;
        this.totallikes = recipedetail.totallikes;
        this.difficulty = recipedetail.difficulty;
        this.cookingtime = recipedetail.cookingtime;
    }

    public addLike(): void {
        this.totallikes += 1;
    }

    public substractLike(): void {
        this.totallikes -= 1;
    }
}