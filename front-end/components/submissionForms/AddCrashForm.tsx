import React from 'react';
import { useState } from 'react';
import { Gebruiker, Race, Crash, Submission_form } from '@types';
import submissionFormService from '@services/SubmissionService';
import raceService from '@services/RaceService';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userData = localStorage.getItem('loggedInUser');
      if (!userData) {
        setError(t('submissionForm.errorMessage'));
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
        setSuccessMessage(t('submissionForm.successMessage'));
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError(t('submissionForm.errorMessage'));
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">{t('submissionForm.requestTitle')}</label>
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
        <label htmlFor="content" className="form-label">{t('submissionForm.requestDescription')}</label>
        <textarea
          id="content"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="raceOption" className="form-label">{t('submissionForm.selectAction')}</label>
        <select
          id="raceOption"
          className="form-select"
          value={raceOption}
          onChange={(e) => setRaceOption(e.target.value)}
          required
        >
          <option value="existing">{t('submissionForm.selectRace')}</option>
          <option value="new">{t('submissionForm.selectRace')}</option>
        </select>
      </div>
      {raceOption === 'existing' ? (
        <div className="mb-3">
          <label htmlFor="existingRaceId" className="form-label">{t('submissionForm.selectRace')}</label>
          <select
            id="existingRaceId"
            className="form-select"
            value={existingRaceId}
            onChange={(e) => setExistingRaceId(e.target.value)}
            required
          >
            <option value="">{t('submissionForm.selectRace')}</option>
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
            <label htmlFor="raceName" className="form-label">{t('submissionForm.requestTitle')}</label>
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
            <label htmlFor="raceType" className="form-label">{t('submissionForm.crashType')}</label>
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
            <label htmlFor="raceDescription" className="form-label">{t('submissionForm.crashDescription')}</label>
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
            <label htmlFor="raceLocation" className="form-label">{t('submissionForm.selectRace')}</label>
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
        <label htmlFor="crashType" className="form-label">{t('submissionForm.crashType')}</label>
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
        <label htmlFor="crashDescription" className="form-label">{t('submissionForm.crashDescription')}</label>
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
        <label htmlFor="casualties" className="form-label">{t('submissionForm.casualties')}</label>
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
        <label htmlFor="deaths" className="form-label">{t('submissionForm.deaths')}</label>
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
      <br/><br/>
      <button type="submit" className="btn btn-primary w-100">{t('submissionForm.submit')}</button>
    </form>
  );
};

export default AddCrashForm;