import React from "react";
import { Activiteit } from "@/types";

type Props = {
    activiteiten: Array<Activiteit>
}

const ActiviteitenOverviewTable: React.FC<Props> = ({activiteiten}: Props) => {
    return (
        <>
            {(
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Naam</th>
                            <th scope="col">Beschrijving</th>
                            <th scope="col">Begindatum</th>
                            <th scope="col">Einddatum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activiteiten.map((activiteit, index) => (
                            <tr key={index}>
                                <td>{activiteit.naam}</td>
                                <td>{activiteit.beschrijving}</td>
                                <td>{new Date(activiteit.begindatum).toLocaleDateString()} {new Date(activiteit.begindatum).toLocaleTimeString()}</td>
                                <td>{new Date(activiteit.einddatum).toLocaleDateString()} {new Date(activiteit.einddatum).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default ActiviteitenOverviewTable;