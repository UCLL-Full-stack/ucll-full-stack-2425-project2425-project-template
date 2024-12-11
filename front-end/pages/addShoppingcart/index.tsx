import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User } from '@types';
import AddShoppingcartForm from '@components/shoppingcart/AddShoppingcartForm';

const ShoppingcartForm: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    return (
        <>
            <Head>
                <title>Create a new shoppingcart</title>
            </Head>

            <section className="w-3/4 m-auto">
                <h1 className="mb-8">Create a shoppingcart</h1>
                {loggedInUser ? (
                    <AddShoppingcartForm />
                ) : (
                    <span>You need to be logged in in order to create a shoppingcart</span>
                )}
            </section>
        </>
    );
};

export default ShoppingcartForm;
