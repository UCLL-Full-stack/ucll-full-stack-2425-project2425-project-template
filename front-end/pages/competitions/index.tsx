import CompetitionOverviewTable from "@/components/competitions/competitionOvervieuwTable";
import Header from "@/components/header";
import TeamOverviewTable from "@/components/teams/teamOverviewTable";
import CompetitionService from "@/services/CompetitionService";
import { Competition } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

const Competitions: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
    const router = useRouter();

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

    const handleAddCompetition = () => {
        router.push('/competitions/addCompetition');
    };

    return (
        <>
            <Head>
                <title>Competitions</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <h1>Competitions</h1>
                <section>
                    <CompetitionOverviewTable
                        competitions={competitions}
                        setCompetitions={setCompetitions}
                        selectCompetition={setSelectedCompetition}
                    />
                </section>
                {selectedCompetition && (
                    <section>
                        <h2>Teams in {selectedCompetition.name}</h2>
                        <TeamOverviewTable competition={selectedCompetition} />
                    </section>
                )}
                <button onClick={handleAddCompetition}>Add competition</button>
            </main>
        </>
    );
};

export default Competitions;