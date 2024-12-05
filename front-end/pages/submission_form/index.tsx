import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import submissionFormService from '@services/submission_formService';
import raceService from '@services/RaceService';
import { Submission_form, Race } from '@types';
import AddCrashForm from '@components/submissionForms/AddCrashForm';
import RemoveCrashForm from '@components/submissionForms/RemoveCrashForm';
import EditCrashForm from '@components/submissionForms/EditCrashForm';

const SubmissionForms: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [submissionForms, setSubmissionForms] = useState<Submission_form[]>([]);
  const [submissionAction, setSubmissionAction] = useState('add');

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await raceService.getAllRaces();
        const races = await response.json();
        setRaces(races);
      } catch (error) {
        console.error('Failed to fetch races:', error);
      }
    };

    const fetchSubmissionForms = async () => {
      try {
        const response = await submissionFormService.getAllSubmissionForms();
        const submissionForms = await response.json();
        setSubmissionForms(submissionForms);
      } catch (error) {
        console.error('Failed to fetch submission forms:', error);
      }
    };

    fetchRaces();
    fetchSubmissionForms();
  }, []);

  const getTitle = () => {
    switch (submissionAction) {
      case 'add':
        return 'Request to Add A New Crash to the Database';
      case 'remove':
        return 'Request to Remove A Crash from the Database';
      case 'edit':
        return 'Request to Edit A Crash in the Database';
      default:
        return 'Submission Forms';
    }
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>{getTitle()}</h1>
        <div className="mb-3">
          <label htmlFor="submissionAction" className="form-label">Select Action</label>
          <select
            id="submissionAction"
            className="form-select"
            value={submissionAction}
            onChange={(e) => setSubmissionAction(e.target.value)}
            required
          >
            <option value="add">Add a Crash</option>
            <option value="remove">Remove a Crash</option>
            <option value="edit">Edit a Crash</option>
          </select>
        </div>

        {submissionAction === 'add' && (
          <AddCrashForm races={races} setSubmissionForms={setSubmissionForms} />
        )}

        {submissionAction === 'remove' && (
          <RemoveCrashForm races={races} setSubmissionForms={setSubmissionForms} />
        )}

        {submissionAction === 'edit' && (
          <EditCrashForm races={races} setSubmissionForms={setSubmissionForms} />
        )}
      </main>
    </>
  );
};

export default SubmissionForms;