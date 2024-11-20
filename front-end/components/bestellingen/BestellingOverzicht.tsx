import { Ingredient } from "@/types"

type Props = {
    bestellingen: Array<Ingredient>
}

const BestellingenOverzicht: React.FC<Props> = ({ bestellingen }: Props) => {
    return (
        <>
            {bestellingen && (
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
                        {bestellingen.map((bestelling, key) => (
                            <tr key={key}>
                                <td>{bestelling.id}</td>
                                <td>{bestelling.naam}</td>
                                <td>{bestelling.type}</td>
                                <td>{bestelling.aantal}</td>
                                <td>{bestelling.prijs}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            )}
        </>
    );
};

export default BestellingenOverzicht;