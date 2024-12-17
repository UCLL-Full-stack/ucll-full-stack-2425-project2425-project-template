import { Trip } from '@/types';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Trips.module.css';
import { useTranslation } from 'next-i18next';
import errorStyles from '../styles/errorMessage.module.css';

type Props = {
    trips: Array<Trip>;
};

const TripOverviewTable: React.FC<Props> = ({ trips }) => {
    const { t } = useTranslation("common");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        setIsLoggedIn(!!token);
    }, []);

    if (!isLoggedIn) {
        return <div className={errorStyles.logInMessage}>Please log in to view this page</div>;
    }

    if (!Array.isArray(trips) || trips.length === 0) {
        return <div>No trips available</div>;
    }

    return (
        <div className={styles['trips-card-container']}>
            {trips.map((trip, index) => (
                <div key={index} className={styles['trip-card']}>
                    <h3 className={styles['trip-destination']}>{trip.destination}</h3>
                    <p className={styles['trip-detail']}>
                        <strong>{t("trips.start")}:</strong> {new Date(trip.startDate).toDateString()}
                    </p>
                    <p className={styles['trip-detail']}>
                        <strong>{t("trips.eind")}:</strong> {new Date(trip.endDate).toDateString()}
                    </p>
                    <p className={styles['trip-detail']}>
                        <strong>{t("trips.prijs")}:</strong> ${trip.price}
                    </p>
                    <p className={styles['trip-description']}>{trip.description}</p>
                </div>
            ))}
        </div>
    );
};

export default TripOverviewTable;
