import styles from "@/styles/eventForm.module.css";

const AddEventForm: React.FC = () => {
  return (
    <>
      <form className="d-flex flex-column flex-gap-2">
        <label htmlFor="eventNameInput">Event</label>
        <input id="eventNameInput" type="text" className={styles.input} />
        <label htmlFor="dateInput">Date</label>
        <input id="dateInput" type="date" className={styles.input} />
        <label htmlFor="priceInput">Price</label>
        <input id="priceInput" type="number" className={styles.input}></input>
        <label htmlFor="minParticipantsInput">Minimum participants</label>
        <input
          id="minParticipantsInput"
          type="number"
          className={styles.input}
        ></input>
        <label htmlFor="maxParticipants">Maximum participants</label>
        <input
          id="maxParticipantsInput"
          type="number"
          className={styles.input}
        ></input>
        <p className="mt-2 mb-0">
          <strong>Location</strong>
        </p>
        <div>
          <label htmlFor="streetInput" className="m-1">
            Street
          </label>
          <input type="text" id="streetInput" className={styles.input}></input>
          <label htmlFor="numberInput" className="m-1">
            Number
          </label>
          <input
            type="number"
            id="numberInput"
            className={styles.input}
          ></input>
          <label htmlFor="cityInput">City</label>
          <input type="text" id="cityInput" className={styles.input}></input>
          <label htmlFor="countryInput">Country</label>
          <input type="text" id="countryInput" className={styles.input}></input>
        </div>
        <p className="mt-2 mn-0">
          <strong>Category</strong>
        </p>
        <div>
          <label htmlFor="categoryNameInput">Name</label>
          <input
            id="categoryNameInput"
            type="text"
            className={styles.input}
          ></input>
          <label htmlFor="description">Description</label>
          <input
            id="categoryDescriptionInput"
            type="text"
            className={styles.input}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Make event
        </button>
      </form>
    </>
  );
};
export default AddEventForm;
