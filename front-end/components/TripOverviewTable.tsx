import { Trip } from '@/types';
import React from 'react';
import styles from '../styles/Trips.module.css'; // Import the CSS module

type Props = {
    trips: Array<Trip>;
};

const TripOverviewTable: React.FC<Props> = ({ trips }) => {
    return (
        <div className={styles['trips-table-container']}>
            {trips && (
                <table className={`${styles.table} table-hover`}>
                    <thead>
                        <tr>
                            <th scope="col">Destination</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip, index) => (
                            <tr key={index}>
                                <td>{trip.destination}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TripOverviewTable;
