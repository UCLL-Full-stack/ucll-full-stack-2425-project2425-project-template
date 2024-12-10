import PlayerService from '@services/PlayerService';
import { Player } from '../../types';

type Props = {
    players: Array<Player>;
};

const TeamPlayers: React.FC<Props> = ({ players }: Props) => {
    return (
        <>
            <div className="shadow-lg rounded w-full mx-auto pt-4">
                {players && (
                    <table className="table table-hover w-full rounded-lg text-center mx-auto">
                        <thead className="bg-accent rounded">
                            <tr className="text-lg text-white font-bold rounded">
                                <th scope="col" className="px-8 py-4 text-center">
                                    Firstname
                                </th>
                                <th scope="col" className="px-8 py-4 text-center">
                                    Lastname
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-background rounded">
                            {players.map((player, index) => (
                                <tr className="bg-background border-b border-primary rounded">
                                    <td className="px-8 py-6 rounded">{player.firstName}</td>
                                    <td className="px-8 py-6 rounded">{player.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default TeamPlayers;
