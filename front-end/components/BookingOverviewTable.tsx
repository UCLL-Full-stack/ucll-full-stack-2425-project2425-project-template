import { Booking } from '@/types';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Bookings.module.css';
import { useTranslation } from 'next-i18next';
import errorStyles from '../styles/errorMessage.module.css';

type Props = {
    bookings: Array<Booking>;
};

const bookingOverviewTable: React.FC<Props> = ({ bookings }) => {
    const { t } = useTranslation("common");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
        useEffect(() => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
            setIsLoggedIn(!!token);
        }, []);

        if (!isLoggedIn) {
            return <div className={errorStyles.logInMessage}>{t("error.login")}</div>;
        }

    if (!Array.isArray(bookings) || bookings.length === 0) {
        return <div>No bookings available</div>;
    }
    return (
        <div className={styles['bookings-table-container']}>
            <table className={`${styles.table} table-hover`}>
                <thead>
                    <tr>
                        <th scope="col">{t("booking.nummer")}</th>
                        <th scope="col">{t("booking.datum")}</th>
                        <th scope="col">{t("booking.status")}</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.tripId}</td>
                            <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                            <td>{booking.paymentStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default bookingOverviewTable;
