import Header from "@components/Header";
import ItemOverview from "@components/ItemOverview";
import ItemsService from "@services/ItemsService";
import { Item } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";




const ItemPage: React.FC = () => {

    const [items, setItems] = useState<Item[] | []>([]);

    useEffect(() => {
        getItems()

    }, []);

    const getItems = async () => {
        const response = await ItemsService.getAllItems();

        const items = await response.json();
        console.log(items)
        setItems(items);
    }
    return (
        <>
            <h1>Item Overview Page</h1>
            <section>
                {items && <ItemOverview items={items} />}
            </section>

        </>
    );
};

export default ItemPage;
