import React from 'react';
import { Team } from '../../types';
import { useRouter } from 'next/router';

type Props = {
    teams: Array<Team>;
    selectTeam: (team: Team) => void;
};

const TeamOverviewTable: React.FC<Props> = ({ teams, selectTeam }: Props) => {
    const router = useRouter();

    return (
        <>
            <div className="shadow-lg rounded w-3/4 mx-auto">
                {teams && (
                    <table className="table table-hover w-full rounded-lg text-center mx-auto">
                        <thead className="bg-accent rounded">
                            <tr className="text-lg text-white font-bold rounded">
                                <th scope="col" className="px-8 py-4 text-center">
                                    Team Name
                                </th>
                                <th scope="col" className="px-8 py-4 text-center">
                                    Coach
                                </th>
                                <th scope="col" className="px-8 py-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-background rounded">
                            {teams.map((team, index) => (
                                <tr className="bg-background border-b border-primary rounded">
                                    <td className="px-8 py-8 rounded flex justify-center">
                                        <a
                                            onClick={() => selectTeam(team)}
                                            className="w-1/2 cursor-pointer hover:bg-accent transition-colors block text-center hover:text-white hover:shadow-md hover:shadow-neutral-400 transition-shadow duration-200 rounded"
                                        >
                                            {team.teamName}
                                        </a>
                                    </td>
                                    <td className="px-8 py-6 rounded">
                                        {team.coach.firstName} {team.coach.lastName}
                                    </td>
                                    <td className="px-8 py-6 rounded">
                                        <button
                                            onClick={() => router.push(`teams/edit/${team.id}`)}
                                            className="bg-primary hover:bg-accent hover:text-white hover:shadow-md hover:shadow-neutral-400 transition-shadow duration-200 rounded py-3 px-6"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default TeamOverviewTable;
