import { Plus } from 'lucide-react';
import Link from 'next/link';
import ItemAdminOverview from '@components/items/ItemsAdminOverview';
import Head from 'next/head';

const AdminPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Admin Item Overview</title>
            </Head>
            <div className="flex items-center gap-4 mb-4">
                <h1>Admin Overview Page</h1>
                <Link
                    href={`itemOverview/addItem`}
                    className="p-1 bg-green-400 rounded-lg text-white hover:bg-green-600 transition-all"
                >
                    <Plus size={24} />
                </Link>
            </div>

            <section>
                <ItemAdminOverview />
            </section>
        </>
    );
};

export default AdminPage;
