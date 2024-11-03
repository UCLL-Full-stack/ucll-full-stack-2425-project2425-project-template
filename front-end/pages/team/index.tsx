import Header from "@components/Header";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/home.module.css"
import useInterval from "use-interval";

import { Team } from "@types";

const TeamPage: React.FC = () => {
    
    const [teams, setTeams] = useState<Array<Team>>();

    return (
        <>
            <Header />
        </>
    )
}

export default TeamPage;