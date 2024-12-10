import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@components/header';
import raceService from '@services/RaceService';
import { Crash } from '@types';

const AddCrash: React.FC = () => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [casualties, setCasualties] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [driverName, setDriverName] = useState('');
  const [driverSurname, setDriverSurname] = useState('');
  const [driverBirthdate, setDriverBirthdate] = useState('');
  const [driverTeam, setDriverTeam] = useState('');
  const [driverCountry, setDriverCountry] = useState('');
  const [driverDescription, setDriverDescription] = useState('');
  const [carName, setCarName] = useState('');
  const [carType, setCarType] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carHp, setCarHp] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { raceId } = router.query;

  const handleAddCrash = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const crash: Crash = {
        type,
        description,
        casualties,
        deaths,
        participants: [
          {
            driver: {
              name: driverName,
              surname: driverSurname,
              birthdate: new Date(driverBirthdate),
              team: driverTeam,
              country: driverCountry,
              description: driverDescription,
            },
            racecar: {
              name: carName,
              type: carType,
              brand: carBrand,
              hp: carHp,
            },
          },
        ],
      };

      const response = await raceService.addCrashToRace(Number(raceId), crash);
      if (response.ok) {
        setSuccessMessage('Crash added successfully!');
        setError('');
        setTimeout(() => {
          router.push(`/races`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Head>
        <title>Add Crash</title>
      </Head>
      <Header />
      <main className="container">
        <h1 className="text-center my-4">Add Crash</h1>
        <form onSubmit={handleAddCrash} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Crash Type</label>
            <input
              type="text"
              id="type"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="casualties" className="form-label">Casualties</label>
            <input
              type="number"
              id="casualties"
              className="form-control"
              value={casualties}
              onChange={(e) => setCasualties(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deaths" className="form-label">Deaths</label>
            <input
              type="number"
              id="deaths"
              className="form-control"
              value={deaths}
              onChange={(e) => setDeaths(Number(e.target.value))}
              required
            />
          </div>
          <h3>Driver Information</h3>
          <div className="mb-3">
            <label htmlFor="driverName" className="form-label">Name</label>
            <input
              type="text"
              id="driverName"
              className="form-control"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverSurname" className="form-label">Surname</label>
            <input
              type="text"
              id="driverSurname"
              className="form-control"
              value={driverSurname}
              onChange={(e) => setDriverSurname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverBirthdate" className="form-label">Birthdate</label>
            <input
              type="date"
              id="driverBirthdate"
              className="form-control"
              value={driverBirthdate}
              onChange={(e) => setDriverBirthdate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverTeam" className="form-label">Team</label>
            <input
              type="text"
              id="driverTeam"
              className="form-control"
              value={driverTeam}
              onChange={(e) => setDriverTeam(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverCountry" className="form-label">Country</label>
            <input
              type="text"
              id="driverCountry"
              className="form-control"
              value={driverCountry}
              onChange={(e) => setDriverCountry(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverDescription" className="form-label">Description</label>
            <textarea
              id="driverDescription"
              className="form-control"
              value={driverDescription}
              onChange={(e) => setDriverDescription(e.target.value)}
              required
            />
          </div>
          <h3>Racecar Information</h3>
          <div className="mb-3">
            <label htmlFor="carName" className="form-label">Car Name</label>
            <input
              type="text"
              id="carName"
              className="form-control"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="carType" className="form-label">Type</label>
            <input
              type="text"
              id="carType"
              className="form-control"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="carBrand" className="form-label">Brand</label>
            <input
              type="text"
              id="carBrand"
              className="form-control"
              value={carBrand}
              onChange={(e) => setCarBrand(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="carHp" className="form-label">Horsepower</label>
            <input
              type="number"
              id="carHp"
              className="form-control"
              value={carHp}
              onChange={(e) => setCarHp(Number(e.target.value))}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <button type="submit" className="btn btn-primary w-100">Add Crash</button>
        </form>
      </main>
    </>
  );
};

export default AddCrash;