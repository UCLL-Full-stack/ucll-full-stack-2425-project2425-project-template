import React, {useState} from "react";
import {Recipe} from "@types";
import Tag from "@components/recipes/tag";


type Props = {
    recipe: {
        title: string;
        tags: Array<{ tagId: number; name: string }>;
    };
};


const RecipeCard: React.FC<Props> = ({recipe}: Props) => {

    const [showAllTags, setShowAllTags] = useState(false);

    const tagLimit: number = 4

    // Toggle function for showing all or fewer tags
    const handleToggleTags = () => {
        setShowAllTags((prev) => !prev);
    };

    const onClickRecipeDetails = () => {

    }

    return (

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="relative">
                <div className="w-full h-48 bg-blue-300"></div>
            </div>
            {/* Content Section */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{recipe.title}</h2>
                <hr className="w-9/10 mx-auto my-2 border-t-4 border-gray-500 shadow-md"/>
                {/* Tags Section */}
                <div className="flex flex-wrap">
                    {recipe.tags.slice(0, showAllTags ? recipe.tags.length : tagLimit).map((tag) => (
                        <Tag key={tag.tagId} text={tag.name}/>
                    ))}
                    {recipe.tags.length > tagLimit && (
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
                onClick={() => onClikRecipeDetails(recipe.id)}
                >
                    View Recipe Details
                </button>
            </div>
        </div>

    );
};

export default RecipeCard;