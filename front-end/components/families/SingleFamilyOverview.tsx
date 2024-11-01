import { Family } from "@/types"

type Props = {
    family: Family;
}

const SingleFamilyOverview: React.FC<Props> = ({family}: Props) => {
    return (
        <>
            <table>
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                {family.familyList &&
                family.familyList.length > 0 &&
                family.familyList.map((member, index) => (
                    <tr key={index}>
                    <td>
                        {member.name}
                    </td>
                    <td>
                        {member.email}
                    </td>
                    <td>
                        {member.role}
                    </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </>
    );
}

export default SingleFamilyOverview;