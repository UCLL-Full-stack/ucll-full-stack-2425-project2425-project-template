import { useState } from 'react';
import { Gebruiker, Race, Crash, Submission_form } from '@types';
import submissionFormService from '@services/submission_formService';
import raceService from '@services/RaceService';

interface Props {
  races: Race[];
  setSubmissionForms: (submissionForms: Submission_form[]) => void;
}

const AddCrashForm: React.FC<Props> = ({ races, setSubmissionForms }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [raceOption, setRaceOption] = useState('existing');
  const [existingRaceId, setExistingRaceId] = useState('');
  const [raceName, setRaceName] = useState('');
  const [raceType, setRaceType] = useState('');
  const [raceDescription, setRaceDescription] = useState('');
  const [raceLocation, setRaceLocation] = useState('');
  const [crashType, setCrashType] = useState('');
  const [crashDescription, setCrashDescription] = useState('');
  const [casualties, setCasualties] = useState('');
  const [deaths, setDeaths] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userData = localStorage.getItem('loggedInUser');
      if (!userData) {
        setError('You must be logged in to submit a form.');
        return;
      }
      const user: Gebruiker = JSON.parse(userData);

      let race: Race;

      if (raceOption === 'existing') {
        race = races.find(r => r.id === parseInt(existingRaceId))!;
      } else {
        race = {
          name: raceName,
          type: raceType,
          description: raceDescription,
          location: raceLocation,
          date: new Date(),
          crashes: [],
        };
      }

      const crash: Crash = {
        type: crashType,
        description: crashDescription,
        casualties: Number(casualties),
        deaths: Number(deaths),
      };

      if (!race.crashes) {
        race.crashes = [];
      }

      race.crashes.push(crash);

      const submissionForm: Submission_form = { title, content, type: 'add', createdAt: new Date(), user, race };

      const response = await submissionFormService.createSubmissionForm(submissionForm);
      if (response.ok) {
        const updatedResponse = await submissionFormService.getAllSubmissionForms();
        const updatedSubmissionForms = await updatedResponse.json();
        setSubmissionForms(updatedSubmissionForms);
        setSuccessMessage('Successfully submitted!');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Request title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">What is this request about?</label>
        <textarea
          id="content"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="raceOption" className="form-label">Race Option</label>
        <select
          id="raceOption"
          className="form-select"
          value={raceOption}
          onChange={(e) => setRaceOption(e.target.value)}
          required
        >
          <option value="existing">Existing Race</option>
          <option value="new">New Race</option>
        </select>
      </div>
      {raceOption === 'existing' ? (
        <div className="mb-3">
          <label htmlFor="existingRaceId" className="form-label">Select Existing Race</label>
          <select
            id="existingRaceId"
            className="form-select"
            value={existingRaceId}
            onChange={(e) => setExistingRaceId(e.target.value)}
            required
          >
            <option value="">Select a race</option>
            {races.map(race => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="raceName" className="form-label">Race Name</label>
            <input
              type="text"
              id="raceName"
              className="form-control"
              value={raceName}
              onChange={(e) => setRaceName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="raceType" className="form-label">Race Type</label>
            <input
              type="text"
              id="raceType"
              className="form-control"
              value={raceType}
              onChange={(e) => setRaceType(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="raceDescription" className="form-label">Race Description</label>
            <input
              type="text"
              id="raceDescription"
              className="form-control"
              value={raceDescription}
              onChange={(e) => setRaceDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="raceLocation" className="form-label">Race Location</label>
            <input
              type="text"
              id="raceLocation"
              className="form-control"
              value={raceLocation}
              onChange={(e) => setRaceLocation(e.target.value)}
              required
            />
          </div>
        </>
      )}
      <div className="mb-3">
        <label htmlFor="crashType" className="form-label">Crash Type</label>
        <input
          type="text"
          id="crashType"
          className="form-control"
          value={crashType}
          onChange={(e) => setCrashType(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="crashDescription" className="form-label">Crash Description</label>
        <input
          type="text"
          id="crashDescription"
          className="form-control"
          value={crashDescription}
          onChange={(e) => setCrashDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="casualties" className="form-label">Casualties</label>
        <input
          type="number"
          id="casualties"
          className="form-control"
          value={casualties}
          onChange={(e) => setCasualties(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="deaths" className="form-label">Deaths</label>
        <input
          type="number"
          id="deaths"
          className="form-control"
          value={deaths}
          onChange={(e) => setDeaths(e.target.value)}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <button type="submit" className="btn btn-primary w-100">Submit</button>
    </form>
  );
};

export default AddCrashForm;