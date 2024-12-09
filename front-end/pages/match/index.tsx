import Header from "@components/Header";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/home.module.css"
import useInterval from "use-interval";

import { Match } from "@types";

const MatchPage: React.FC = () => {

    const [matches, setMatches] = useState<Array<Match>>();

    return (
        <>
            <Header />
        </>
    )
}

export default MatchPage;