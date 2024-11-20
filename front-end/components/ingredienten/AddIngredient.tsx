import { Ingredient } from "@/types";

type Props = {
    ingredient: Ingredient
}

const AddIngredient: React.FC<Props> = ({ ingredient }: Props) => {
    return (
        <>
            <form>
                <label>Naam:</label>
                <input type="text" name="name" value={ingredient.naam} />
                <label>Naam:</label>
                <input type="text" name="type" value={ingredient.type} />
                <label>Naam:</label>
                <input type="text" name="aantal" value={ingredient.aantal} />
                <label>Naam:</label>
                <input type="text" name="prijs" value={ingredient.prijs} />
                <input type="submit" />
            </form>
        </>
    );
}

export default AddIngredient