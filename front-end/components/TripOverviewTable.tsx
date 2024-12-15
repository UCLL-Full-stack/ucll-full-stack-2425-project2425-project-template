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
        <div className={styles['trips-table-container']}>
            {trips && (
                <table className={`${styles.table} table-hover`}>
                    <thead>
                        <tr>
                            <th scope="col">{t("trips.bestemming")}</th>
                            <th scope="col">{t("trips.start")}</th>
                            <th scope="col">{t("trips.eind")}</th>
                            <th scope="col">{t("trips.prijs")}</th>
                            <th scope="col">{t("trips.omschrijving")}</th>
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