import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <>
            <h3>You currently don't have any shoppingcarts :(</h3>
            <Link
                href={'/addShoppingcart'}
                className="inline-block mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                type="submit"
            >
                Create one!
            </Link>
        </>
    );
};

export default Home;
