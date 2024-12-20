import { createContext, ReactNode, useState, useContext } from "react";

interface User {
    userId: string;
    username: string;
    globalName: string;
    userAvatar: string;
    guildIds?: string[];
}

interface UserContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue|undefined>(undefined);

export const UserProvider = ( {children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}