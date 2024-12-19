import { Booking, DecodedToken } from '@/types';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Bookings.module.css';
import { useTranslation } from 'next-i18next';
import errorStyles from '../styles/errorMessage.module.css';
import UserService from '@/services/UserService';
import bookingService from '@/services/bookingService';
import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';

const BookingOverviewTable: React.FC = () => {
    const { t } = useTranslation("common");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const [studentId, setStudentId] = useState<number | null>(null);

    

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const role = loggedInUser ? JSON.parse(loggedInUser).role : null;
        const username = loggedInUser ? JSON.parse(loggedInUser).username : null;
        const studentId = loggedInUser ? JSON.parse(loggedInUser).studentId : null;

        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);

                if (decodedToken.studentId) {
                    setStudentId(decodedToken.studentId);
                }
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
        if(token) {
            setIsLoggedIn(true);
            setUserRole(role);
        }

    }, []);

    const fetchBookings = async (): Promise<Booking[] | null> => {
        try {
            const response = await bookingService.getAllBookings();
            const bookings : Booking[] = await response.json();

            let bookingsOfStudent : Booking[] = [];

            bookings.forEach(booking => {
                booking.students.forEach(student => {
                    if(student.id == studentId) {
                        bookingsOfStudent.push(booking)
                    }
                })
            });

            return bookingsOfStudent;
        } catch (error) {
            console.error('Error fetching juniors:', error);
            return null;
        }
    };

    const { data: bookings } = useSWR('fetchBookings', fetchBookings, {
        refreshInterval: 1000,
    });

    /////////////////////////////////////////////////////////////////////////////////////////
    if (!isLoggedIn) {
        return <div className={errorStyles.logInMessage}>{t("error.login")}</div>;
    }

    if (!Array.isArray(bookings) || bookings.length === 0) {
        return <div className={errorStyles.loading}>{t("loading")}</div>;
    }

    if (userRole === 'guest') {
        return <div className={errorStyles.logInMessage}>{t("error.notAuthorized")}</div>;
    }

    if (userRole !== 'admin' && userRole !== 'student') {
        return null;
    }

    return (
        <div className={styles['bookings-table-container']}>
            <table className={`${styles.table} table-hover`}>
                <thead>
                    <tr>
                        <th scope="col">{t("booking.nummer")}</th>
                        <th scope="col">{t("booking.destination")}</th>
                        <th scope="col">{t("booking.datum")}</th>
                        <th scope="col">{t("booking.status")}</th>
                    </tr>
                </thead>
                <tbody>
                {bookings && bookings
                .filter(booking => booking.students.some(student => student.id === studentId))
                .map((booking, index) => (
                    <tr key={index}>
                        <td>{booking.trip.id}</td>
                        <td>{booking.trip.destination}</td>
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
