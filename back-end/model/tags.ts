import { Recipe } from "./recipe";

export class Tag {
    private _tagId?: number;
    private _name: string;
    private _description: string;

    constructor(tag: { tagId?: number, name: string, description: string }) {
        this._tagId = tag.tagId;
        this._name = tag.name;
        this._description = tag.description;
    }

    getTagId(): number | undefined {
        return this._tagId;
    }
    // No setter of id need this database will set it. 

    getName(): string {
        return this._name;
    }

    setName(name: string): void {
        this._name = name;
    }

    getDescription(): string {
        return this._description;
    }

    setDescription(description: string): void {
        this._description = description;
    }

    getRecipes(): Recipe[] {
        return this._recipes;
    }

    setRecipes(recipes: Recipe[]): void {
        this._recipes = recipes;
    }


    //I haven't included the Id because this will normally never match 
    //I also haven't included the recipes because if the have the same name and description the are still the same
    equals(tag: Tag): boolean {
        return(
            this._name === tag._name &&
            this._description === tag._description 
        )
    }
}
