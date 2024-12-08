import { Bestelling, Ingredient } from "@/types"
import { useRouter } from "next/router";

type Props = {
    bestellingen: Array<Bestelling>;
    selectBestelling: (bestelling: Bestelling) => void;
}
const BestellingenOverzicht: React.FC<Props> = ({ bestellingen, selectBestelling }: Props) => {
    const router = useRouter();

    return (
        <>
            {bestellingen && (
                <table>
                    <thead>
                        <tr>
                            <th>Order nummer</th>
                            <th>Naam</th>
                            <th>Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestellingen.map((bestelling, index) => (
                            <tr key={index} onClick={() => { router.push(`/bestellingen/${bestelling.id}`); selectBestelling(bestelling) }} role="button">
                                <td>#{bestelling.id}</td>
                                <td>{bestelling.user.voornaam + " " + bestelling.user.naam}</td>
                                <td>{bestelling.datum ? bestelling.datum.toLocaleString() : null}</td>
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