import AddItemForm from '@components/items/AddItemForm';
import Head from 'next/head';

const NutritionlabelForm: React.FC = () => {
    return (
        <>
            <Head>
                <title>Add Item</title>
            </Head>
            <AddItemForm />
        </>
    );
};

export default NutritionlabelForm;
