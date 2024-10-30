import React, { useState } from 'react';
import EventService from "@/services/EventService";
import styles from "@/styles/eventForm.module.css";
import { Event } from "@/types";
import { useRouter } from "next/router";

const AddEventForm: React.FC = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(0);
  const [minParticipants, setMinParticipants] = useState(1);
  const [maxParticipants, setMaxParticipants] = useState(1);
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(1);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const event: Event = {
      name: eventName,
      date: new Date(date),
      price,
      minParticipants,
      maxParticipants,
      location: {
        street,
        number,
        city,
        country,
      },
    };

    try {
      await EventService.addEvent(event);
      setTimeout(() => {
        router.push('/events');
      }
      , 1000);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <>
      <form className="d-flex flex-column flex-gap-2" onSubmit={handleSubmit}>
        <label htmlFor="eventNameInput">Event</label>
        <input
          id="eventNameInput"
          type="text"
          className={styles.input}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <label htmlFor="dateInput">Date</label>
        <input
          id="dateInput"
          type="date"
          className={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="priceInput">Price</label>
        <input
          id="priceInput"
          type="number"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
        />
        <label htmlFor="minParticipantsInput">Minimum participants</label>
        <input
          id="minParticipantsInput"
          type="number"
          className={styles.input}
          value={minParticipants}
          onChange={(e) => setMinParticipants(Number(e.target.value))}
          min={1}
        />
        <label htmlFor="maxParticipantsInput">Maximum participants</label>
        <input
          id="maxParticipantsInput"
          type="number"
          className={styles.input}
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(Number(e.target.value))}
          min={1}
        />
        <p className="mt-2 mb-0">
          <strong>Location</strong>
        </p>
        <div>
          <label htmlFor="streetInput" className="m-1">
            Street
          </label>
          <input
            type="text"
            id="streetInput"
            className={styles.input}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <label htmlFor="numberInput" className="m-1">
            Number
          </label>
          <input
            type="number"
            id="numberInput"
            className={styles.input}
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            min={1}
          />
          <label htmlFor="cityInput">City</label>
          <input
            type="text"
            id="cityInput"
            className={styles.input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="countryInput">Country</label>
          <input
            type="text"
            id="countryInput"
            className={styles.input}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Make event
        </button>
      </form>
    </>
  );
};

export default AddEventForm;