import FamilyService from "@/services/FamilyService";
import { Family } from "@/types";
import FamiliesOverview from "@components/families/FamiliesOverview";
import SingleFamilyOverview from "@components/families/SingleFamilyOverview";
import Header from "@components/header";
import Head from "next/head";
import { useEffect, useState } from "react";

const Families: React.FC = () => {
    const [families, setFamilies] = useState<Array<Family>>([]);
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);

    const getAllFamilies = async () => {
        const families = await FamilyService.getAllFamlies();
        setFamilies(families);
    }

    useEffect(() => {
        getAllFamilies();
    }, [])

    return (
        <>
            <Head>
                <title>Families</title>
            </Head>
            <main>
                <Header/>
                <h1>All Families</h1>
                <FamiliesOverview families={families} selectedFamily={setSelectedFamily}/>
                {selectedFamily && (
                    <>
                    <h2>Members of the "{selectedFamily.name}" family</h2>
                    <SingleFamilyOverview family={selectedFamily}/>
                    </>
                )}
            </main>
        </>
    );
}

export default Families;