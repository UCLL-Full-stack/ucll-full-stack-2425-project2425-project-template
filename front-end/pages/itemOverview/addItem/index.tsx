import { Item } from '@types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ItemService from '@services/ItemsService';
import AddNutritionLabelForm from '@components/nutritionlabel/AddNutritionlabelForm';
import AddItemForm from '@components/items/AddItemForm';

const NutritionlabelForm: React.FC = () => {
    return (
        <>
            <section>
                <AddItemForm />
            </section>
        </>
    );
};

export default NutritionlabelForm;
