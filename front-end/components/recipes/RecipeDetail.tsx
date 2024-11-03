import React from "react";
import {Recipe} from "@types";

type Props = {
    recipe: Recipe
}

const RecipeDetailTable: React.FC<Props> = ({recipe}: Props) => {
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Key</th>
                    <th className="py-2 px-4 border-b">Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="py-2 px-4 border-b">Title</td>
                    <td className="py-2 px-4 border-b">{recipe._title}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Description</td>
                    <td className="py-2 px-4 border-b">{recipe._description}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Instructions</td>
                    <td className="py-2 px-4 border-b">{recipe._instructions}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Nutrition Facts</td>
                    <td className="py-2 px-4 border-b">{recipe._nutritionFacts}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Cooking Tips</td>
                    <td className="py-2 px-4 border-b">{recipe._cookingTips}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Extra Notes</td>
                    <td className="py-2 px-4 border-b">{recipe._extraNotes}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Created At</td>
                    <td className="py-2 px-4 border-b">{new Date(recipe._createdAt).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Updated At</td>
                    <td className="py-2 px-4 border-b">{new Date(recipe._updatedAt).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">User</td>
                    <td className="py-2 px-4 border-b">{recipe._user._firstName} {recipe._user._lastName}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Tags</td>
                    <td className="py-2 px-4 border-b">
                        {recipe._tags.map(tag => tag._name).join(", ")}
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default RecipeDetailTable;