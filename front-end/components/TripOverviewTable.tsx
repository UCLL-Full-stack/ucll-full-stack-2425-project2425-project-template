import { Trip } from '@/types';
import React from 'react';
import styles from '../styles/Trips.module.css';

type Props = {
    trips: Array<Trip>;
};

const TripOverviewTable: React.FC<Props> = ({ trips }) => {
  if (!trips) {
    return <div className={styles['bookings-table-container']}>Loading...</div>;
  }
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
                                <td>{new Date(trip.startDate).toDateString()}</td>
                                <td>{new Date(trip.endDate).toDateString()}</td>
                                <td>{trip.price}</td>
                                <td>{trip.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TripOverviewTable;