const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllSubmission_forms = async () => {
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
  
  const submission_formService = {
    getAllSubmission_forms,
    createSubmissionForm,
  };

  export default submission_formService;
