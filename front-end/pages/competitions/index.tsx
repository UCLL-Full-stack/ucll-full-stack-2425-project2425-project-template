import CompetitionOverviewTable from "@/components/competitions/competitionOvervieuwTable";
import Header from "@/components/header";
import TeamOverviewTable from "@/components/teams/teamOverviewTable";
import CompetitionService from "@/services/CompetitionService";
import { Competition } from "@/types";
import { Head } from "next/document";
import { useEffect, useState } from "react";

const Competitions: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

    const getCompetitions = async () => {
        try {
            const data = await CompetitionService.getAllCompetitions();
            setCompetitions(data);
        } catch (error) {
            console.error('Failed to fetch competitions:', error);
        }
    };

    useEffect(() => {
        getCompetitions();
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title>Competitions</title>
            </Head>
            <main>
                <h1>Competitions</h1>
                <section>
                    <h2>Competitions overview</h2>
                    <CompetitionOverviewTable competitions={competitions} selectCompetition={setSelectedCompetition} />
                </section>
                {selectedCompetition && (
                    <section>
                        <h2>Teams in {selectedCompetition.name}</h2>
                        <TeamOverviewTable competition={selectedCompetition} />
                    </section>
                )}
            </main>
        </>
    );
};

export default Competitions;