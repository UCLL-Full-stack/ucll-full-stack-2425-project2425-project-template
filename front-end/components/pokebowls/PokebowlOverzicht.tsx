import { Pokebowl } from "@/types"
import { useRouter } from "next/router";

type Props = {
    pokebowls: Array<Pokebowl>
    selectPokebowl: (pokebowl: Pokebowl) => void;
}

const PokebowlOverzicht: React.FC<Props> = ({ pokebowls, selectPokebowl }: Props) => {
    const router = useRouter();
    return (
        <>
            {pokebowls && (
                console.log(pokebowls),
                <table>
                    <tbody>
                        {pokebowls.map((pokebowl, index) => (
                            <tr key={index} onClick={() => { router.push(`/pokebowls/${pokebowl.id}`); selectPokebowl(pokebowl) }} role="button">
                                <td><img src="assets/salmon-pokebowl.png" alt={pokebowl.naam} /></td>
                                <td>{pokebowl.naam}</td>
                                <td>€{pokebowl.prijs}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            )}
        </>
    );
};

export default PokebowlOverzicht;