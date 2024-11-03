import Header from '@components/Header';
import ItemOverview from '@components/items/ItemOverview';
import Nutritionlabel from '@components/items/NutritionLabel';
import ItemsService from '@services/ItemsService';
import { Item } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ItemPage: React.FC = () => {
    const [items, setItems] = useState<Item[] | []>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
            <h1 className="mb-4">Item Overview Page</h1>
            <section>
                {items && <ItemOverview items={items} selectItem={setSelectedItem} />}

                {selectedItem && (
                    <section>
                        <Nutritionlabel item={selectedItem} />
                    </section>
                )}
            </section>
        </>
    );
};

export default ItemPage;
