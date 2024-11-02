import { useEffect, useState } from "react";
import ItemService from "@services/ItemsService";
import { Item, Nutritionlabel } from "@types";
import { useRouter } from "next/router";

type Props = {
    item: Item;
}

const AddNutritionLabel: React.FC<Props> = ({ item }: Props) => {
    const router = useRouter()
    const [nutritionlabel, setNutritionlabel] = useState<Nutritionlabel>({
        id: item.nutritionlabel?.id || 0,
        energy: item.nutritionlabel?.energy || 0,
        fat: item.nutritionlabel?.fat || 0,
        saturatedFats: item.nutritionlabel?.saturatedFats || 0,
        carbohydrates: item.nutritionlabel?.carbohydrates || 0,
        sugar: item.nutritionlabel?.sugar || 0,
        protein: item.nutritionlabel?.protein || 0,
        salts: item.nutritionlabel?.salts || 0,
        item: item || undefined,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNutritionlabel(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await ItemService.addNutritionlabelToItem(item.id, nutritionlabel);
        } catch (error) {
            console.error("Error adding nutrition label:", error);
        }

        router.push("/adminoverview")
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4 w-1/2 mx-auto mb-16">
            <label htmlFor="energy">Energy:</label>
            <input
                type="number"
                required
                name="energy"
                value={nutritionlabel.energy}
                onChange={handleInputChange}
                className="px-4 py-2 mb-4 bg-gray-200 rounded-xl"
            />
            <label htmlFor="fat">Fat:</label>
            <input
                type="number"
                required
                name="fat"
                value={nutritionlabel.fat}
                onChange={handleInputChange}
                className="px-4 py-2 mb-4 bg-gray-200 rounded-xl"
            />
            <label htmlFor="saturatedFats">Saturated Fats:</label>
            <input
                type="number"
                required
                name="saturatedFats"
                value={nutritionlabel.saturatedFats}
                onChange={handleInputChange}
                className="px-4 py-2 mb-4 bg-gray-200 rounded-xl"
            />
            <label htmlFor="carbohydrates">Carbohydrates:</label>
            <input
                type="number"
                required
                name="carbohydrates"
                value={nutritionlabel.carbohydrates}
                onChange={handleInputChange}
                className="px-4 py-2 mb-4 bg-gray-200 rounded-xl"
            />
            <label htmlFor="sugar">Sugar:</label>
            <input
                type="number"
                required
                name="sugar"
                value={nutritionlabel.sugar}
                onChange={handleInputChange}
                className="px-4 py-2 mb-4 bg-gray-200 rounded-xl"
            />
            <label htmlFor="protein">Protein:</label>
            <input
                type="number"
                required
                name="protein"
                value={nutritionlabel.protein}
                onChange={handleInputChange}
                className="px-4 py-2 mb-4 bg-gray-200 rounded-xl"
            />
            <label htmlFor="salts">Salts:</label>
            <input
                type="number"
                required
                name="salts"
                value={nutritionlabel.salts}
                onChange={handleInputChange}
                className="px-4 py-2 bg-gray-200 rounded-xl"
            />
            <input
                type="submit"
                value="Submit"
                className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
            />
        </form>
    );
};

export default AddNutritionLabel;