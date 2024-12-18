import { UserLogin } from '@/types';

const login = (userlogin: UserLogin) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/authenticate", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userlogin),
    });
};

export default { login };