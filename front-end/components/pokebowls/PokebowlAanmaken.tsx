import Ingredienten from "@/pages/ingredienten";
import { Ingredient, Pokebowl } from "@/types";

type Props = {
    pokebowl: Pokebowl | null;
    ingredienten: Array<Ingredient>;
};


const PokebowlAanmaken: React.FC<Props> = ({ pokebowl, ingredienten }: Props) => {
    return (
        <>
            {pokebowl &&
                <form>
                    <label>Pokebowl naam:</label>
                    <input type="text" value={pokebowl.naam} name="pokebowlNaam" />
                    <label>Pokebowl type:</label>
                    <input type="text" value={pokebowl.type} name="pokebowlType" />
                    <label>Pokebowl beschrijving:</label>
                    <input type="text" value={pokebowl.beschrijving} name="pokebowlBeschrijving" />
                    <label>Pokebowl max aantal ingredienten:</label>
                    <input type="text" value={pokebowl.maxAantalIngredienten} name="pokebowlMaxAantalIngredienten" />
                    <label>Pokebowl prijs:</label>
                    <input type="text" value={pokebowl.prijs} name="pokebowlPrijs" />
                    <label>Pokebowl ingredienten:</label>
                    {/* {
                        Ingredienten.map((ingredient, index) => <option value={index}>{ingredient.naam}</option>);
                    } */}
                    <input type="submit" />
                </form>
            }
        </>
    );
}

export default PokebowlAanmaken;