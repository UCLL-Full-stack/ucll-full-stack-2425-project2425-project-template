import React from 'react';
import { useState } from 'react';
import { Gebruiker, Race, Crash, Submission_form } from '@types';
import submissionFormService from '@services/SubmissionService';
import { useTranslation } from 'next-i18next';

interface Props {
  races: Race[];
  setSubmissionForms: (submissionForms: Submission_form[]) => void;
}

const RemoveCrashForm: React.FC<Props> = ({ races, setSubmissionForms }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedRaceId, setSelectedRaceId] = useState('');
  const [selectedCrashId, setSelectedCrashId] = useState('');
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

      const race = races.find(r => r.id === parseInt(selectedRaceId))!;
      const crash = race.crashes?.find(c => c.id === parseInt(selectedCrashId));
      if (!crash) {
        setError(t('submissionForm.errorMessage'));
        return;
      }

      const submissionForm: Submission_form = { title, content, type: 'remove', createdAt: new Date(), user, race };

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
        <label htmlFor="selectedRaceId" className="form-label">{t('submissionForm.selectRace')}</label>
        <select
          id="selectedRaceId"
          className="form-select"
          value={selectedRaceId}
          onChange={(e) => setSelectedRaceId(e.target.value)}
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
      {selectedRaceId && (
        <div className="mb-3">
          <label htmlFor="selectedCrashId" className="form-label">{t('submissionForm.selectCrash')}</label>
          <select
            id="selectedCrashId"
            className="form-select"
            value={selectedCrashId}
            onChange={(e) => setSelectedCrashId(e.target.value)}
            required
          >
            <option value="">{t('submissionForm.selectCrash')}</option>
            {races.find(race => race.id === parseInt(selectedRaceId))?.crashes?.map(crash => (
              <option key={crash.id} value={crash.id}>
                {crash.description}
              </option>
            ))}
          </select>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <br/><br/>
      <button type="submit" className="btn btn-primary w-100">{t('submissionForm.submit')}</button>
    </form>
  );
};

export default RemoveCrashForm;