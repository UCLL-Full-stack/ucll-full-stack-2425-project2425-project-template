import React from 'react';
import AddCarForm from '@/components/cars/AddCarForm';
import Header from '@/components/header';

const AddCarPage: React.FC = () => {
    return (
        <>
        <Header/>
        <div style={{ padding: '2rem' }}>
            <h1>Add a New Car</h1>
            <p>Fill out the form below to add a new car to the database.</p>
            <AddCarForm />
        </div>
        </>
    );
};

export default AddCarPage;