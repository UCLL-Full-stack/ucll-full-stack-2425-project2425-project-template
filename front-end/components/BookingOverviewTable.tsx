import { Booking } from '@/types';
import React from 'react';
import styles from '../styles/bookings.module.css';

type Props = {
    bookings: Array<Booking>;
};

const bookingOverviewTable: React.FC<Props> = ({ bookings }) => {
    if (!bookings) {
        return <div className={styles['bookings-table-container']}>Loading...</div>;
    }
    return (
        <div className={styles['bookings-table-container']}>
            <table className={`${styles.table} table-hover`}>
                <thead>
                    <tr>
                        <th scope="col">bookingId</th>
                        <th scope="col">booking date</th>
                        <th scope="col">Payment status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.tripId}</td>
                            <td>{booking.bookingDate.toLocaleDateString()}</td>
                            <td>{booking.paymentStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default bookingOverviewTable;
