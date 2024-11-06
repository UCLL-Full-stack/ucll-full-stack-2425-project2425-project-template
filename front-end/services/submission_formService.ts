const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllSubmissionForms = async () => {
    return fetch(apiUrl + "/submission_forms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const createSubmissionForm = async (submissionForm: any) => {
    return fetch(apiUrl + "/submission_forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionForm),
    });
  };

  const acceptSubmissionForm = async (submissionFormId: number): Promise<Response> => {
    return fetch(`${apiUrl}/submission_forms/accept/${submissionFormId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  const deleteSubmissionForm = async (submissionFormId: number): Promise<Response> => {
    return fetch(`${apiUrl}/submission_forms/${submissionFormId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  const submission_formService = {
    getAllSubmissionForms,
    createSubmissionForm,
    acceptSubmissionForm,
    deleteSubmissionForm,
  };

  export default submission_formService;
