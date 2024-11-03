import React, {useState} from "react";
import {Recipe} from "@types";
import Tag from "@components/recipes/tag";
import {router} from "next/client";

type Props = {
    recipe: Recipe
};


const RecipeCard: React.FC<Props> = ({recipe}: Props) => {

    const [showAllTags, setShowAllTags] = useState(false);

    const tagLimit: number = 4

    // Toggle function for showing all or fewer tags
    const handleToggleTags = () => {
        setShowAllTags((prev) => !prev);
    };

    const onClickRecipeDetails = (id: number) => {
        router.push(`/recipes/${id}`);
    }

    return (

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="relative">
                <div className="w-full h-48 bg-blue-300"></div>
            </div>
            {/* Content Section */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{recipe._title}</h2>
                <hr className="w-9/10 mx-auto my-2 border-t-4 border-gray-500 shadow-md"/>
                {/* Tags Section */}
                <div className="flex flex-wrap">
                    {recipe._tags.slice(0, showAllTags ? recipe._tags.length : tagLimit).map((tag) => (
                        <Tag key={tag._tagId} text={tag._name}/>
                    ))}
                    {recipe._tags.length > tagLimit && (
                        <button
                            onClick={handleToggleTags}
                            className="bg-teal-600 text-white px-3 py-1 rounded-full shadow"
                        >
                            {showAllTags ? 'Show Less' : 'More Views'}
                        </button>
                    )}
                </div>
                {/*Recipe details button*/}
                <button
                    onClick={() => onClickRecipeDetails(recipe._recipeId ?? -1)}
                    className="bg-green-500 text-white px-3 py-1 rounded-full shadow mt-2 mx-auto block"
                >
                    View Recipe Details
                </button>
            </div>
        </div>

    );
};

export default RecipeCard;