const getAllSubmission_forms = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return fetch(apiUrl + "/submission_forms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

const submission_formService = {
    getAllSubmission_forms
}

export default submission_formService;