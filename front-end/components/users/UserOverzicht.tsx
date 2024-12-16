import UserService from "@/services/UserService";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
    users: Array<User>;
    selectUser: (user: User) => void;
}

const UserOverzicht: React.FC<Props> = ({ users, selectUser }: Props) => {
    const [userList, setUserList] = useState(users);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await UserService.deleteUser(id);
            if (response.ok) {
                setUserList(userList.filter(user => user.id !== id)); 
                setStatusMessage("Gebruiker verwijderd");
                setTimeout(() => setStatusMessage(null), 3000);
            } else {
                console.error("Error deleting user");
            }
        } catch (error) {
            console.error("An error occurred while deleting the user:", error);
        }
    };

    console.log(users);
    return (
        <>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
            {userList && (
                <table>
                    <thead>
                        <tr>
                            <th>Voornaam</th>
                            <th>Achternaam</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={index} onClick={() => { router.push(`/users/${user.id}`); selectUser(user), console.log(selectUser) }} role="button">
                                <td>{user.voornaam}</td>
                                <td>{user.naam}</td>
                                <td>{user.email}</td>
                                <td>
                                    {loggedInUser?.id !== user.id && (
                                        <button onClick={(e) => { e.stopPropagation(); if (user.id !== undefined) handleDelete(user.id); }}>
                                            Verwijder
                                        </button>
                                    )}
                                </td>                           
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
};

export default UserOverzicht;