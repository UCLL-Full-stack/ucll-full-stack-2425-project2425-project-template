import { useState, useEffect } from 'react';
import { Gebruiker, Race, Crash, Submission_form } from '@types';
import submissionFormService from '@services/submission_formService';

interface Props {
  races: Race[];
  setSubmissionForms: (submissionForms: Submission_form[]) => void;
}

const EditCrashForm: React.FC<Props> = ({ races, setSubmissionForms }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedRaceId, setSelectedRaceId] = useState('');
  const [selectedCrashId, setSelectedCrashId] = useState('');
  const [crashType, setCrashType] = useState('');
  const [crashDescription, setCrashDescription] = useState('');
  const [casualties, setCasualties] = useState('');
  const [deaths, setDeaths] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (selectedRaceId && selectedCrashId) {
      const race = races.find(r => r.id === parseInt(selectedRaceId));
      const crash = race?.crashes?.find(c => c.id === parseInt(selectedCrashId));
      if (crash) {
        setCrashType(crash.type);
        setCrashDescription(crash.description);
        setCasualties(crash.casualties.toString());
        setDeaths(crash.deaths.toString());
      }
    }
  }, [selectedRaceId, selectedCrashId, races]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userData = localStorage.getItem('loggedInUser');
      if (!userData) {
        setError('You must be logged in to submit a form.');
        return;
      }
      const user: Gebruiker = JSON.parse(userData);

      const race = races.find(r => r.id === parseInt(selectedRaceId))!;
      const crash = race.crashes?.find(c => c.id === parseInt(selectedCrashId))!;
      if (!crash) {
        setError('Crash not found.');
        return;
      }

      crash.type = crashType;
      crash.description = crashDescription;
      crash.casualties = Number(casualties);
      crash.deaths = Number(deaths);

      const submissionForm: Submission_form = { title, content, type: 'edit', createdAt: new Date(), user, race };

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
        <label htmlFor="selectedRaceId" className="form-label">Select Race</label>
        <select
          id="selectedRaceId"
          className="form-select"
          value={selectedRaceId}
          onChange={(e) => setSelectedRaceId(e.target.value)}
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
      {selectedRaceId && (
        <div className="mb-3">
          <label htmlFor="selectedCrashId" className="form-label">Select Crash</label>
          <select
            id="selectedCrashId"
            className="form-select"
            value={selectedCrashId}
            onChange={(e) => setSelectedCrashId(e.target.value)}
            required
          >
            <option value="">Select a crash</option>
            {races.find(race => race.id === parseInt(selectedRaceId))?.crashes?.map(crash => (
              <option key={crash.id} value={crash.id}>
                {crash.description}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedCrashId && (
        <>
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
        </>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <button type="submit" className="btn btn-primary w-100">Submit</button>
    </form>
  );
};

export default EditCrashForm;