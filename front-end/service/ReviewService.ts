export const createReview = async (reviewData: {
    movieId: number;
    rating: number;
    content: string;
  }) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return response.json();
  };
  