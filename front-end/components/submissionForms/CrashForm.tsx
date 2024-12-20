import React, { use } from 'react';
import { useState } from 'react';
import { Crash, Driver, Race, Racecar, Submission_form } from '@types';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import DriverService from '@services/DriverService';
import RacecarService from '@services/RacecarService';
import submission_formService from '@services/SubmissionService';
import crashService from '@services/CrashService';
import raceService from '@services/RaceService';

interface Props {
  races: Race[];
  setSubmissionForms: (submissionForms: Submission_form[]) => void;
}

const CrashForm: React.FC<Props> = ({ races, setSubmissionForms }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [availableCrashes, setAvailableCrashes] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [racecars, setRacecars] = useState<Racecar[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; permission: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchRacecars = async () => {
      try {
        const response = await RacecarService.getAllRacecars();
        const data = await response.json();
        setRacecars(data);
      } catch (error) {
        console.error('Error fetching racecars:', error);
      }
    };

    fetchRacecars();
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await DriverService.getAllDrivers();
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newItems = [...items];
    newItems[index] = e.target.value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSubmissionForm = {
      title,
      content: description,
      type: selectedOption,
      createdAt: new Date(),
      user: loggedInUser
    };

    const response = await submission_formService.createSubmissionForm(newSubmissionForm);
    if (response.ok) {
      setTitle('');
      setDescription('');
      setSelectedOption('');
      setItems([]);
      alert('Submission successful!');
    } else {
      const errorData = await response.json();
      setTitle(`Error: ${errorData.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>{t('Title')}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>{t('Description')}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>{t('Options')}</label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="option1">Add Crash</option>
          <option value="option2">Edit Crash</option>
          <option value="option3">Remove Crash</option>
        </select>
      </div>
      {selectedOption !== 'option2' && selectedOption !== 'option3' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Casualties</label>
          <input
            type="number"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <label>Deaths</label>
          <input
            type="number"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <label>Drivers</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map((item, index) => (
              <div key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <select
                    value={item}
                    onChange={(e) => handleItemChange(e as any, index)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                  >
                    {drivers.map((driver, index) => (
                      <option key={index} value={driver.id}>
                        {driver.name} {driver.surname}
                      </option>
                    ))}
                  </select>
                  <select
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                  >
                    {racecars.map((racecar, index) => (
                      <option key={index} value={racecar.id}>
                        {racecar.name}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => removeItem(index)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#dc3545', color: '#fff' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addItem} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#28a745', color: '#fff' }}>
              Add Driver
            </button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>{t('Race')}</label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                {races.map((race, index) => (
                  <option key={index} value={race.id}>
                    {race.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )
      }
      {(selectedOption === 'option3') && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{t('Select Race')}</label>
            <select
              value={selectedRace}
              onChange={async (e) => {
                setSelectedRace(e.target.value);
                const raceResponse = await raceService.getRaceByName(e.target.value);
                const raceData = await raceResponse.json();
                const crashResponse = await crashService.getCrashByRaceId(raceData.id);
                const crashData = await crashResponse.json();
                setAvailableCrashes(crashData.description);
              }}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {races.map((race, index) => (
                <option key={index} value={race.id}>
                  {race.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{t('Available Crashes')}</label>
            <ul>
              {availableCrashes.map((crash, index) => (
                <li key={index}>{crash}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      <button type="submit" style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
        {t('Submit')}
      </button>
    </form >
  );
};

export default CrashForm;