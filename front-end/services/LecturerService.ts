const URL = process.env.NEXT_PUBLIC_API_URL + '/lecturers';

const getAllLecturers = async () => 
{
  const response = await fetch(URL);
  return await response.json();
}

const getLecturerById = async (id: string) => 
{
  const response = await fetch(`${URL}/${id}`);
  return await response.json();
}

const LecturerService = {
  getAllLecturers,
  getLecturerById,
};

export default LecturerService;
