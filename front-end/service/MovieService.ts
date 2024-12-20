
const getAllMovies = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/movie", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
   },
  });
};

const MovieService = {
  getAllMovies
};
  
  export default MovieService;
