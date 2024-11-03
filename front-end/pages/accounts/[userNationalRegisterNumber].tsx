import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import Head from "next/head";
import Header from "@/components/header";
import { User } from "@/types";
import UserDetails from "@/components/users/userDetails";

const ReadUserByNationalRegisterNumber = () => {
    const [user, setUser] = useState<User>();

    const router = useRouter();
    const {userNationalRegisterNumber} = router.query;

    const getUserByNationalRegisterNumber = async () => {
        const [userResponse] = await Promise.all([UserService.getUserByNationalRegisterNumber(userNationalRegisterNumber as string)])
        const [userData] = await Promise.all([userResponse.json()]);
        setUser(userData);
    }

    useEffect(() => {
        if (userNationalRegisterNumber) 
            getUserByNationalRegisterNumber();
        }
    );

    return (
        <>
            <Head>
                <title>User info</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                {!userNationalRegisterNumber && <p>Loading</p>}
                <section>
                    {user && <UserDetails user={user}></UserDetails>}
                </section>
            </main>
        </>
    ) 
}


export default ReadUserByNationalRegisterNumber;