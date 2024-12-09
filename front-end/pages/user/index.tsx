import Header from "@components/Header";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/home.module.css"
import useInterval from "use-interval";

import { User } from "@types";

const UserPage: React.FC = () => {
    
    const [user, setUser] = useState<User>();

    return (
        <>
            <Header />
        </>
    )
}

export default UserPage;