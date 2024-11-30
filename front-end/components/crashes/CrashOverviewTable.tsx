import { Race, User } from "@types";
import { useEffect, useState } from "react";

interface Props {
    race: Race;
}

const CrashOverviewTable: React.FC<Props> = ({ race }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = sessionStorage.getItem("loggedInUser");
        if (userData) {
            setLoggedInUser(JSON.parse(userData));
        }
        console.log(loggedInUser);
    })

    return (
        <>
            {race.crashes && race.crashes.length > 0 ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Description</th>
                            <th scope="col">Casualties</th>
                            <th scope="col">Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {race.crashes.map((crash, index) => (
                            <tr key={index}>
                                <td>{crash.type}</td>
                                <td>{crash.description}</td>
                                <td>{crash.casualties}</td>
                                <td>{crash.deaths}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No crashes available.</p>
            )}
        </>
    );
};

export default CrashOverviewTable;
