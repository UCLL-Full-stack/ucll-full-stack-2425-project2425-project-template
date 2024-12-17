import EventService from '@services/EventService';
import TicketService from '@services/TicketService';
import styles from '@styles/home.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CreateEventForm: React.FC = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<Date>(null);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [ticketAmount, setTicketAmount] = useState<number>();
    const [ticketType, setTicketType] = useState('');
    const [ticketPrice, setTicketPrice] = useState<number>();

    // Errors
    const [eventNameError, setEventNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dateError, setDateError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [ticketAmountError, setTicketAmountError] = useState('');
    const [ticketTypeError, setTicketTypeError] = useState('');
    const [ticketPriceError, setTicketPriceError] = useState('');

    // Status
    const [status, setStatus] = useState('');

    const router = useRouter();

    const validateForm = (): boolean => {
        if (!eventName || eventName.trim() === '') {
            setEventNameError('Event name is required.');
            return false;
        }
        if (!description || description.trim() === '') {
            setDescriptionError('Description is required.');
            return false;
        }
        if (!date) {
            setDateError('Date is required.');
            return false;
        }
        if (!location || location.trim() === '') {
            setLocationError('Location is required.');
            return false;
        }
        if (!category || category.trim() === '') {
            setCategoryError('Category is required.');
            return false;
        }
        if (!ticketAmount) {
            setTicketAmountError('Ticket amount is required.');
            return false;
        }
        if (!ticketType || ticketType.trim() === '') {
            setTicketTypeError('Ticket type is required.');
            return false;
        }
        if (!ticketPrice) {
            setTicketPriceError('Ticket price is required.');
            return false;
        }

        return true;
    }

    const handleCreateEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setEventNameError('');
        setDescriptionError('');
        setDateError('');
        setLocationError('');
        setCategoryError('');
        setTicketAmountError('');
        setTicketTypeError('');
        setTicketPriceError('');

        if (validateForm()) {
            const eventData = {name: eventName, description: description, date: date, location: location, category: category, isTrending: false};

            const response = await EventService.createEvent(eventData);
            const createdEvent = await response.json();

            for (let i = 0; i < ticketAmount; i++) {
                await TicketService.createTicket(ticketType, ticketPrice, createdEvent);
            }

            setStatus('Event and its tickets were created successfully. Redirecting to upcoming events page...');

            setTimeout(() => {
                router.push('/upcoming-events');
            }, 3000);
        }
    };

    return (
        <>
            <form
                className={styles.createEventForm}
                onSubmit={handleCreateEventSubmit}
            >
                <div className={styles.createEventFormContainer}>
                    <div className={styles.createEventFormContainerEvent}>
                        <p className={styles.createEventFormContainerTitles}>Creating event</p>
                        <div>
                            <label
                                htmlFor="name">Event name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setEventName(e.target.value)}
                                 />
                            {eventNameError !== '' && <p className={styles.loginErrorMessage}>{eventNameError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="description">Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                 />
                            {descriptionError !== '' && <p className={styles.loginErrorMessage}>{descriptionError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="date">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                onChange={(e) => setDate(new Date(e.target.value))}
                                 />
                            {dateError !== '' && <p className={styles.loginErrorMessage}>{dateError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="location">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                onChange={(e) => setLocation(e.target.value)}
                                 />
                            {locationError !== '' && <p className={styles.loginErrorMessage}>{locationError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="category">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                onChange={(e) => setCategory(e.target.value)}
                                 />
                            {categoryError !== '' && <p className={styles.loginErrorMessage}>{categoryError}</p>}
                        </div>
                    </div>
                    <div className={styles.createEventFormContainerTicket}>
                        <p className={styles.createEventFormContainerTitles}>Creating tickets for this event</p>
                        <div>
                            <label
                                htmlFor='ticketAmount'>
                                Ticket amount
                            </label>
                            <select
                                id="ticketAmount"
                                className='ticketAmount'
                                onChange={(e) => setTicketAmount(parseInt(e.target.value))}
                            >
                                <option value="">Select the number of tickets (maximum 5)</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {ticketAmountError !== '' && <p className={styles.loginErrorMessage}>{ticketAmountError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor='ticketType'>
                                Ticket type
                            </label>
                            <select
                                id="ticketType"
                                className='ticketType'
                                onChange={(e) => setTicketType(e.target.value)}
                            >
                                <option value="">Select ticket type</option>
                                <option value="VIP">VIP</option>
                                <option value="REGULAR">REGULAR</option>
                                <option value="FREE">FREE</option>
                                <option value="STUDENT">STUDENT</option>
                            </select>
                            {ticketTypeError !== '' && <p className={styles.loginErrorMessage}>{ticketTypeError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor='ticketPrice'>
                                Ticket price
                            </label>
                            <input
                                type='number'
                                id='ticketPrice'
                                name='ticketPrice'
                                onChange={(e) => setTicketPrice(parseInt(e.target.value))}
                                 />
                            {ticketPriceError !== '' && <p className={styles.loginErrorMessage}>{ticketPriceError}</p>}
                        </div>
                    </div>
                </div>
                <button type="submit">Create event</button>
                {status !== '' && <p className={styles.loginSuccessMessage}>{status}</p>}
            </form>
        </>
    )
};

export default CreateEventForm;