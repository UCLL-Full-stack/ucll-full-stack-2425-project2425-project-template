import Header from "@/components/header";
import TeamOverviewTable from "@/components/teams/TeamOverviewTable";
import TeamService from "@/services/TeamService";
import { Team } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Teams: React.FC = () => {
    
    const [teams, setTeams] = useState<Array<Team>>();

    const getTeams = async () => {
        const response = await TeamService.getAllTeams();
        const teams = await response.json();
        setTeams(teams);
    }

    useEffect(() => {
        getTeams();
    }, []);

    return (
        <>
            <Head>
                <title>Teams - TeamTrack</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Teams</h1>
                <section>
                    <h2>Team overview</h2>
                    {teams && (<TeamOverviewTable
                        teams={teams}
                        />)}
                </section>
                <button>Create Team</button>
            </main>
        </>
    );
};

export default Teams;