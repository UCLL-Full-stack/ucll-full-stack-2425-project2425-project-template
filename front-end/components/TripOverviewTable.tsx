import { Trip } from '@/types';
import React from 'react';
import styles from '../styles/Trips.module.css';
import { useTranslation } from 'next-i18next';

type Props = {
    trips: Array<Trip>;
};

const TripOverviewTable: React.FC<Props> = ({ trips }) => {
    const { t } = useTranslation("common");

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