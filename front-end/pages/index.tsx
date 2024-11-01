import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from '../styles/Index.module.css';

const OverviewPage: React.FC = () => {
  return (
    <div className={styles['overview-page']}>
      <Navbar />
      <section className={styles['welcome-section']}>
        <h1>Welcome to EuroStudent Travel</h1>
        <p>
          The EuroStudent Travel web platform is designed specifically for students seeking affordable
          travel trips across Europe. The platform offers a curated list of budget-friendly trips with
          essential details such as destinations, places 2B, and pricing tailored for students. Users can
          explore the trips, view and easily book their next adventure, making travel more accessible for
          young adventurers!
        </p>
      </section>

      <section className={styles['featured-destinations']}>
        <h2>Popular Destinations</h2>
        <div className={styles['destinations-grid']}>
          <div className={styles['destination-card']}>
            <img src="/images/paris.jpg" alt="Paris" />
            <h3>Paris</h3>
            <p>Experience the City of Lights and all its wonders on a budget.</p>
          </div>
          <div className={styles['destination-card']}>
            <img src="/images/berlin.jpg" alt="Berlin" />
            <h3>Berlin</h3>
            <p>Discover Berlin's rich history, culture, and vibrant nightlife.</p>
          </div>
          <div className={styles['destination-card']}>
            <img src="/images/rome.jpg" alt="Rome" />
            <h3>Rome</h3>
            <p>Explore ancient Rome and its iconic landmarks.</p>
          </div>
        </div>
      </section>

      <section className={styles['navigation-links']}>
        <h2>Plan Your Adventure</h2>
        <Link href="/destinations">Browse Destinations</Link>
        <Link href="/bookings">View Bookings</Link>
      </section>
    </div>
  );
};

export default OverviewPage;
