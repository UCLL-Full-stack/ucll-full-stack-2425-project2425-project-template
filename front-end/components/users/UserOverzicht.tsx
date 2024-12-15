import { User } from "@/types";
import { useRouter } from "next/router";

type Props = {
    users: Array<User>;
    selectUser: (user: User) => void;
}

const UserOverzicht: React.FC<Props> = ({ users, selectUser }: Props) => {
    const router = useRouter();
    console.log(users);
    return (
        <>
            {users && (
                <table>
                    <thead>
                        <tr>
                            <th>Voornaam</th>
                            <th>Achternaam</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} onClick={() => { router.push(`/users/${user.id}`); selectUser(user), console.log(selectUser) }} role="button">
                                <td>{user.voornaam}</td>
                                <td>{user.naam}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
};

export default UserOverzicht;