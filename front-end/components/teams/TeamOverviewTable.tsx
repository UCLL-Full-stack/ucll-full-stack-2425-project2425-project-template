import React from "react";
import { Team } from "@/types";

type Props = {
  teams: Array<Team>;
  selectTeam: (team: Team) => void;
};

const TeamOverviewTable: React.FC<Props> = ({ teams, selectTeam }: Props) => {
  return (
    <>
      {teams && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Team Name</th>
              <th scope="col">Coach</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index} onClick={() => selectTeam(team)} role="button">
                <td>{team.teamName}</td>
                <td>
                  {team.coach.firstName} {team.coach.lastName}
                </td>
                <td>
                  <link rel="EditTeam" href={`/teams/edit/${team.id}`}>
                    <button>Edit</button>
                  </link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TeamOverviewTable;
