import Header from "@/components/header";
import userService from "@/services/userService";
import { User } from "@/types/index";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Feed: React.FC = () => {

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<User>();

    const fetchUser = async (id: number) => {
        const response = await userService.findById(id);
        if (!response.ok){
            const res = await response.json();
            setError(res.message);
            return;
        }
        setUser(await response.json());
    }

    useEffect(() => {
        const userString = sessionStorage.getItem("LoggedInUser");
        if(!userString || 
           userService.isJwtExpired(JSON.parse(userString).token)
          ){
            setIsLoggedIn(false); 
            router.push("/login");
            return;
        }
        setIsLoggedIn(true);

        const id = JSON.parse(userString).id;
        fetchUser(id); 
    }, []);
    
    return (
        <>
            <Head>
                <title>Yadig</title>
            </Head>
            <div className="flex flex-col h-screen">
                <Header current="discover" isLoggedIn={isLoggedIn}/>
                {error?(
                    <>
                    </>
                ):(
                    <main className="flex-1 bg-bg1 p-10 overflow-y-auto">
                    </main>
                )}
            </div>
        </>
    );
}

export default Feed;
