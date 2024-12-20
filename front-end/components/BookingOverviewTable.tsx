import { Booking, DecodedToken } from '@/types';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Bookings.module.css';
import { useTranslation } from 'next-i18next';
import errorStyles from '../styles/errorMessage.module.css';
import bookingService from '@/services/bookingService';
import { jwtDecode } from 'jwt-decode';

const BookingOverviewTable: React.FC = () => {
    const { t } = useTranslation("common");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [studentId, setStudentId] = useState<number | null>(null);
    const [bookings, setBookings] = useState<Booking[] | null>(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) return;
    
        const { token, role } = JSON.parse(loggedInUser);
    
        setIsLoggedIn(!!token);
        setUserRole(role || null);
    
        if (!token) return;
    
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            if (decodedToken?.studentId) {
                setStudentId(decodedToken.studentId);
            }
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }, []);
    

    const fetchBookings = async (): Promise<Booking[] | null> => {
        try {
            const response = await bookingService.getAllBookings();
            const bookings: Booking[] = await response.json();

            if (userRole === 'admin') {
                return bookings;
            } else {
                return bookings.filter((booking) =>
                    booking.students.some((student) => student.id === studentId)
                );
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            return null;
        }
    };

    useEffect(() => {
        const loadBookings = async () => {
            const fetchedBookings = await fetchBookings();
            setBookings(fetchedBookings);
        };

        loadBookings();
    }, [userRole, studentId]);

    const handleDelete = async (bookingId: number) => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

        if (!token) {
            alert('You must be logged in to delete a booking.');
            return;
        }

        try {
            const response = await bookingService.deleteBooking(bookingId.toString(), token);
            if (response.ok) {
                setBookings((prevBookings) => prevBookings?.filter((booking) => booking.id !== bookingId) || null);
                alert('Booking deleted successfully.');
            } else {
                alert('Failed to delete booking.');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Error deleting booking.');
        }
    };

    const handleUpdatePaymentStatus = async (bookingId: number, newStatus: string) => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

        if (!token) {
            alert('You must be logged in to update a booking.');
            return;
        }

        try {
            const response = await bookingService.updatePaymentStatus(bookingId.toString(), newStatus, token);
            if (response.ok) {
                const updatedBooking = await response.json();
                setBookings((prevBookings) =>
                    prevBookings?.map((booking) => (booking.id === bookingId ? updatedBooking : booking)) || null
                );
                alert('Payment status updated successfully.');
            } else {
                alert('Failed to update payment status.');
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            alert('Error updating payment status.');
        }
    };

    if (!isLoggedIn) {
        return <div className={errorStyles.logInMessage}>{t("error.login")}</div>;
    }

    if (userRole === 'guest') {
        return <div className={errorStyles.logInMessage}>{t("error.notAuthorized")}</div>;
    }

    if (!Array.isArray(bookings) || bookings.length === 0) {
        return <div className={errorStyles.loading}>{t("loading")}</div>;
    }

    const filteredBookings = userRole === 'admin' ? bookings : bookings.filter((booking) => booking.students.some((student) => student.id === studentId));

    return (
        <div className={styles['bookings-table-container']}>
            <table className={`${styles.table} table-hover`}>
                <thead>
                    <tr>
                        <th scope="col">{t("booking.nummer")}</th>
                        <th scope="col">{t("booking.destination")}</th>
                        <th scope="col">{t("booking.datum")}</th>
                        <th scope="col">{t("booking.status")}</th>
                        {userRole === 'admin' && <th scope="col">{t("booking.delete")}</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.trip.id}</td>
                            <td>{booking.trip.destination}</td>
                            <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                            <td>
                                {userRole === 'admin' ? (
                                    <select
                                        className={styles['booking-payment-default']}
                                        value={booking.paymentStatus}
                                        onChange={(e) => handleUpdatePaymentStatus(booking.id ?? 0, e.target.value)}
                                    >
                                        <option className={styles['booking-payment-update']} value="Paid">{t("booking.paid")}</option>
                                        <option className={styles['booking-payment-update']} value="Pending">{t("booking.pending")}</option>
                                        <option className={styles['booking-payment-update']} value="Confirmed">{t("booking.confirmed")}</option>
                                    </select>
                                ) : (
                                    booking.paymentStatus
                                )}
                            </td>
                            {userRole === 'admin' && (
                                <td>
                                    <button
                                        className={styles['delete']}
                                        onClick={() => handleDelete(booking.id ?? 0)}
                                    >
                                        {t("booking.delete")}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingOverviewTable;
