import TeamOverviewTable from '../../components/teams/TeamOverviewTable';
import TeamPlayers from '../../components/teams/TeamPlayers';
import TeamService from '../../services/TeamService';
import { Team } from '../../types';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@components/layout/Layout';
import Link from 'next/link';

const Teams: React.FC = () => {
    const [teams, setTeams] = useState<Array<Team>>();
    const [selectedTeam, setSelectedTeam] = useState<Team>();

    const router = useRouter();

    const getTeams = async () => {
        const response = await TeamService.getAllTeams();
        const teams = await response.json();
        setTeams(teams);
    };

    useEffect(() => {
        getTeams();
    }, []);

    const createTeamRoute = async () => {
        router.push('/teams/create');
    };

    const handleClick = () => {
        router.reload();
    };

    return (
        <Layout>
            <Head>
                <title>Teams - TeamTrack</title>
            </Head>
            <div className="flex flex-col items-center justify-center space-y-12">
                <Link href="/teams" passHref>
                    <div
                        className="flex items-center hover:shadow-lg duration-200 cursor-pointer"
                        onClick={handleClick}
                    >
                        <h1 className="max-w-4xl mx-auto px-10 text-6xl font-bold text-center mt-3 border-b border-primary">
                            Team Overview
                        </h1>
                    </div>
                </Link>
                <section className="flex justify-center space-y-8 w-full">
                    {teams && <TeamOverviewTable teams={teams} selectTeam={setSelectedTeam} />}
                </section>
                {selectedTeam && (
                    <section>
                        <h2 className="max-w-4xl mx-auto px-10 text-4xl font-bold text-center mt-3 pb-2 border-b border-primary">
                            Players in {selectedTeam.teamName}:
                        </h2>
                        {selectedTeam.players && <TeamPlayers players={selectedTeam.players} />}
                    </section>
                )}
                <button
                    onClick={createTeamRoute}
                    className="bg-secondary hover:bg-accent text-white transition-colors hover:shadow-heavy duration-200 py-2 px-4 rounded-md hover:bg-accent"
                >
                    Create Team
                </button>
            </div>
        </Layout>
    );
};

export default Teams;
