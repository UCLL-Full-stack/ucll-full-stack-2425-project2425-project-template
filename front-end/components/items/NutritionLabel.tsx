import { Item } from "@types";


type Props = {
    item: Item;
}

const NutritionLabel: React.FC<Props> = ({ item }: Props) => {
    return (
        <>
            {item.nutritionlabel && (
                <section>
                    <h2>NutritionLabel</h2>
                    <div>
                        <ul>
                            <li>Energy: {item.nutritionlabel.energy} g</li>
                            <li>Fats: {item.nutritionlabel.fat} g</li>
                            <li>Saturatedfats: {item.nutritionlabel.saturatedFats} g</li>
                            <li>Carbohydrates: {item.nutritionlabel.carbohydrates} g</li>
                            <li>Sugar: {item.nutritionlabel.sugar} g</li>
                            <li>Protein: {item.nutritionlabel.protein} g</li>
                            <li>Salts: {item.nutritionlabel.salts} g</li>
                        </ul>
                    </div>
                </section>
            )}
            {!item.nutritionlabel && (
                <h2>This product has no nutritionlabel yet</h2>
            )}
        </>
    )
};


export default NutritionLabel;