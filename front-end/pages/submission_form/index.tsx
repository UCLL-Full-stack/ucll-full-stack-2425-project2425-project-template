import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import submissionFormService from '@services/submission_formService';
import raceService from '@services/RaceService';
import { Submission_form, Race, Gebruiker } from '@types';
import AddCrashForm from '@components/submissionForms/AddCrashForm';
import RemoveCrashForm from '@components/submissionForms/RemoveCrashForm';
import EditCrashForm from '@components/submissionForms/EditCrashForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const SubmissionForms: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [submissionForms, setSubmissionForms] = useState<Submission_form[]>([]);
  const [submissionAction, setSubmissionAction] = useState('add');
  const [loggedInUser, setLoggedInUser] = useState<Gebruiker | null>(null);
  const { t } = useTranslation();

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
        setSubmissionForms(Array.isArray(submissionForms) ? submissionForms : []);
      } catch (error) {
        console.error('Failed to fetch submission forms:', error);
      }
    };

    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }

    fetchRaces();
    fetchSubmissionForms();
  }, []);

  const getTitle = () => {
    switch (submissionAction) {
      case 'add':
        return t('submissionForm.addCrash');
      case 'remove':
        return t('submissionForm.removeCrash');
      case 'edit':
        return t('submissionForm.editCrash');
      default:
        return t('submissionForm.title');
    }
  };

  const handleAccept = async (submissionFormId: number) => {
    try {
      await submissionFormService.acceptSubmissionForm(submissionFormId);
      const updatedResponse = await submissionFormService.getAllSubmissionForms();
      const updatedSubmissionForms = await updatedResponse.json();
      setSubmissionForms(Array.isArray(updatedSubmissionForms) ? updatedSubmissionForms : []);
    } catch (error) {
      console.error('Failed to accept submission form:', error);
    }
  };

  const handleDeny = async (submissionFormId: number) => {
    try {
      await submissionFormService.deleteSubmissionForm(submissionFormId);
      const updatedResponse = await submissionFormService.getAllSubmissionForms();
      const updatedSubmissionForms = await updatedResponse.json();
      setSubmissionForms(Array.isArray(updatedSubmissionForms) ? updatedSubmissionForms : []);
    } catch (error) {
      console.error('Failed to deny submission form:', error);
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
        {loggedInUser?.permission !== 'ADMIN' && (
          <>
            <div className="mb-3">
              <label htmlFor="submissionAction" className="form-label">{t('submissionForm.selectAction')}</label>
              <select
                id="submissionAction"
                className="form-select"
                value={submissionAction}
                onChange={(e) => setSubmissionAction(e.target.value)}
                required
              >
                <option value="add">{t('submissionForm.addCrash')}</option>
                <option value="remove">{t('submissionForm.removeCrash')}</option>
                <option value="edit">{t('submissionForm.editCrash')}</option>
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
          </>
        )}

        {loggedInUser?.permission === 'ADMIN' && (
          <div className="mt-5">
            <h2>{t('submissionForm.pendingSubmissions')}</h2>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">{t('submissionForm.title')}</th>
                  <th scope="col">{t('submissionForm.type')}</th>
                  <th scope="col">{t('submissionForm.createdAt')}</th>
                  <th scope="col">{t('submissionForm.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(submissionForms) && submissionForms.map((submissionForm) => (
                  <tr key={submissionForm.id}>
                    <td>{submissionForm.title}</td>
                    <td>{submissionForm.type}</td>
                    <td>{new Date(submissionForm.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-success me-2" onClick={() => handleAccept(submissionForm.id!)}>{t('submissionForm.accept')}</button>
                      <button className="btn btn-danger" onClick={() => handleDeny(submissionForm.id!)}>{t('submissionForm.deny')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default SubmissionForms;