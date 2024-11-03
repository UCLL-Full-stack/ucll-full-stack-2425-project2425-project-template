import ItemsService from '@services/ItemsService';
import { Item } from '@types';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import ItemAdminOverview from '@components/items/ItemsAdminOverview';
import Head from 'next/head';

const AdminPage: React.FC = () => {
    const [items, setItems] = useState<Item[] | []>([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const response = await ItemsService.getAllItems();
        const items = await response.json();
        setItems(items);
    };
    return (
        <>
            <Head>
                <title>Admin Item Overview</title>
            </Head>
            <div className="flex items-center gap-4 mb-4">
                <h1>Admin Overview Page</h1>
                <Link
                    href={`itemOverview/addItem`}
                    className="p-1 bg-green-400 rounded-lg text-white"
                >
                    <Plus size={24} />
                </Link>
            </div>

            <section>{items && <ItemAdminOverview items={items} />}</section>
        </>
    );
};

export default AdminPage;
