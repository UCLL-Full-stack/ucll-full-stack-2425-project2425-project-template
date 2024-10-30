
import { User } from "types/index";

type Props = {
  users: User[]
}

const UserOverview: React.FC<Props> = ({ users }: Props) => {

  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {user.role}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default UserOverview
