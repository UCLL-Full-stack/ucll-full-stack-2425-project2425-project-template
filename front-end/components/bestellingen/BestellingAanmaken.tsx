import BestellingService from "@/services/BestellingService";
import { Pokebowl, StatusMessage, User } from "@/types";
import classNames from "classnames";
import router from "next/router";
import { FormEvent, useState } from "react";

type Props = {
    user: User;
    pokebowls: Array<Pokebowl>;
};


const BestellingAanmaken: React.FC<Props> = ({ user: user, pokebowls: pokebowls }: Props) => {
    let [standardPrijs, setStandardPrijs] = useState<number>(0);
    const [totaalPrijs, setTotaalPrijs] = useState<number>();
    const [selectedPokebowls, setSelectedPokebowls] = useState<Array<Pokebowl>>([]);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
        clearErrors();

        return result;
    };

    const handlePokebowls = (event: any) => {
        console.log(user.id);
        const selectedPokebowl = parseInt(event.target.value);
        const pokebowl = pokebowls.find(pokebowl => pokebowl.id === selectedPokebowl);

        console.log(pokebowl);

        if (!pokebowl) return;

        const getAllPokebowls = [...selectedPokebowls, pokebowl];
        setSelectedPokebowls(getAllPokebowls);
        setTotaalPrijs(standardPrijs += pokebowl.prijs || 0);
        setStandardPrijs(standardPrijs += pokebowl.prijs || 0);
        console.log(getAllPokebowls);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const response = await BestellingService.createBestelling({ user: user, pokebowls: selectedPokebowls });
        const result = await response.json();
        console.log(result);
        console.log({ user: user, pokebowls: selectedPokebowls });

        if (response.status === 200) {
            setStatusMessages([{ message: `Bestelling is aangemaakt`, type: "success" }]);
            setTimeout(() => {
                router.push("/bestellingen");
            }, 2000);
        } else {
            setStatusMessages([{ message: result.message, type: "error" }])
        }


    };

    return (
        <>
            <div className="addForms">
                {statusMessages && (
                    <div className="status">
                        {statusMessages.map(({ message, type }, index) => (
                            <p key={index} className={classNames({
                                "error-field": type === "error",
                                "ok-field": type === "success",
                            })}>
                                {message}
                            </p>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <p>{user.gebruikersnaam}</p>
                    <label>Pokebowls</label>
                    <table>
                        {pokebowls && pokebowls.map((pokebowl) => (
                            <tr key={pokebowl.id}>
                                <td>{pokebowl.naam}</td>
                                <td><button type="button" value={pokebowl.id} onClick={handlePokebowls}>Toevoegen</button></td>
                            </tr>
                        ))}
                    </table>
                    <p>Totaal prijs: {totaalPrijs}</p>
                    <label>Bestelling:</label>
                    <table>
                        {selectedPokebowls && selectedPokebowls.map((pokebowl) => (
                            <tr key={pokebowl.id}>
                                <td>{pokebowl.naam}</td>
                            </tr>
                        ))}
                    </table>
                    <input type="submit" value="Bestelling plaatsen" />
                </form>
            </div>
        </>
    );
}


export default BestellingAanmaken;