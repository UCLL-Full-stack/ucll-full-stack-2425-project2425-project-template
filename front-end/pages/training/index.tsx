import Header from "@components/Header";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/home.module.css"
import useInterval from "use-interval";

import { Training } from "@types";

const TrainingPage: React.FC = () => {
    
    const [trainings, setTrainings] = useState<Array<Training>>();

    return (
        <>
            <Header />
        </>
    )
}

export default TrainingPage;