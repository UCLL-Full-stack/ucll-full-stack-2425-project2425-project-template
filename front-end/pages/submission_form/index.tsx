import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import submissionFormService from '@services/submission_formService';
import { Submission_form } from '@types';

const SubmissionForms: React.FC = () => {
  const [submissionForms, setSubmissionForms] = useState<Submission_form[]>([]);

  const fetchSubmissionForms = async () => {
    try {
      const getSubmissionForms = await submissionFormService.getAllSubmission_forms();
      const submissionForms = await getSubmissionForms.json();
      setSubmissionForms(submissionForms);
    } catch (error) {
      console.error('Failed to fetch submission forms:', error);
    }
  };

  useEffect(() => {
    fetchSubmissionForms();
  }, []);

  return (
    <>
      <Head>
        <title>Submission Forms</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Request to add new record</h1>
        <form action="/imput_from">
          <div className="center">
            <label htmlFor="value1"> Please insert 1: </label>
            <input type="text" id="value1" name="value1" placeholder="some value here" />
          </div>
          <div className="center">
            <label htmlFor="value1"> Please insert value 2: </label>
            <input type="text" id="value1" name="value1" placeholder="some value here" />
          </div>
          <div className="center">
            <label htmlFor="value1"> Please insert value 3: </label>
            <input type="text" id="value1" name="value1" placeholder="some value here" />
          </div>
          <br/><br/>
          <input type="submit" id="submit" value="Submit"></input>
        </form>
        <ul>
          {submissionForms.map((form) => (
            <li key={form.id}>
              <h2>{form.title}</h2>
              <p>{form.content}</p>
              <p>User: {form.user.username}</p>
              <p>Race: {form.race.name}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default SubmissionForms;