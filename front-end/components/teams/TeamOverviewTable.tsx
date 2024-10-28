import React from 'react';
import { Team } from '@/types';

type Props = {
  teams: Array<Team>;
};

const TeamOverviewTable: React.FC<Props> = ({ teams }: Props) => {
  return (
    <>
      {teams && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Team Name</th>
              <th scope="col">Coach</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.teamName}</td>
                <td>{team.coach.firstName} {team.coach.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TeamOverviewTable;