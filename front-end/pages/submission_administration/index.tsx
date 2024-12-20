import React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import submissionFormService from '@services/SubmissionService';
import { Submission_form, Gebruiker } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const SubmissionsOverview: React.FC = () => {
    const [submissions, setSubmissions] = useState<Submission_form[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<Gebruiker | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const userData = localStorage.getItem('loggedInUser');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.permission !== 'ADMIN') {
                window.location.href = '/';
            }
            setLoggedInUser(user);
            fetchSubmissions();
            console.log("user id is:")
            console.log(user.id)
        }
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await submissionFormService.getAllSubmissionForms();
            const submissions = await response.json();
            console.log('Fetched submissions:', submissions);
            setSubmissions(submissions);
        } catch (error) {
            console.error('Failed to fetch submissions:', error);
        }
    };

    return (
        <>
          <Head>
            <title>{t('submissionForm.title')}</title>
          </Head>
          <Header />
          <main className="container">
            <h1>{t('submissionForm.title')}</h1>
            {submissions.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">{t('submissionForm.title')}</th>
                    <th scope="col">{t('submissionForm.type')}</th>
                    <th scope="col">{t('submissionForm.createdAt')}</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td>{submission.title}</td>
                      <td>{submission.type}</td>
                      <td>{new Date(submission.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{t('submissionForm.noSubmissions')}</p>
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
    
    export default SubmissionsOverview;