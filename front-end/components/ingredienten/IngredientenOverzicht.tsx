import { Ingredient } from "@/types"

type Props = {
    ingredienten: Array<Ingredient>
}

const IngredientenOverzicht: React.FC<Props> = ({ ingredienten }: Props) => {
    return (
        <>
            {ingredienten && (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Naam</th>
                            <th>Type</th>
                            <th>Aantal</th>
                            <th>Prijs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredienten.map((ingredient, key) => (
                            <tr key={key}>
                                <td>{ingredient.id}</td>
                                <td>{ingredient.naam}</td>
                                <td>{ingredient.type}</td>
                                <td>{ingredient.aantal}</td>
                                <td>{ingredient.prijs}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            )}
        </>
    );
};

export default IngredientenOverzicht;