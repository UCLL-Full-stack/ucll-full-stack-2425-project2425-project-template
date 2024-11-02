import ItemsService from "@services/ItemsService";
import { Item } from "@types";
import ItemsAdminOverview from "@components/items/ItemsAdminOverview"
import { useEffect, useState } from "react";



const AdminPage: React.FC = () => {
    const [items, setItems] = useState<Item[] | []>([]);

    useEffect(() => {
        getItems()
    }, []);

    const getItems = async () => {
        const response = await ItemsService.getAllItems();
        const items = await response.json();
        setItems(items)
    }
    return (
        <>
            <h1>Admin overview page</h1>
            <section>
                {items && <ItemsAdminOverview items={items} />}
            </section>
        </>
    )
}


export default AdminPage;