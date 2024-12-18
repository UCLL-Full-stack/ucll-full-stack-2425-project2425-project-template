import { Booking } from '@/types';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Bookings.module.css';
import { useTranslation } from 'next-i18next';
import errorStyles from '../styles/errorMessage.module.css';

type Props = {
    bookings: Array<Booking>;
};

const BookingOverviewTable: React.FC<Props> = ({ bookings }) => {
    const { t } = useTranslation("common");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const role = loggedInUser ? JSON.parse(loggedInUser).role : null;
        setIsLoggedIn(!!token);
        setUserRole(role);
    }, []);

    if (!isLoggedIn) {
        return <div className={errorStyles.logInMessage}>{t("error.login")}</div>;
    }

    // If the user is a guest, show a permission error
    if (userRole === 'guest') {
        return <div className={errorStyles.logInMessage}>{t("error.notAuthorized")}</div>;
    }

    // Only render for admin or student
    if (userRole !== 'admin' && userRole !== 'student') {
        return null;
    }

    // If no bookings, show a fallback message
    if (!Array.isArray(bookings) || bookings.length === 0) {
        return <div>{t("booking.noBookings")}</div>;
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

export default BookingOverviewTable;
