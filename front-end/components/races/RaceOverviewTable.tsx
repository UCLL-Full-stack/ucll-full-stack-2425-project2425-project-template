import React, { useState } from 'react';
import { Race } from '@types';
import Link from 'next/link';

interface Props {
  races: Array<Race>;
  selectRace: (race: Race) => void;
}

const RaceOverviewTable: React.FC<Props> = ({ races, selectRace }: Props) => {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const handleRaceClick = (race: Race) => {
    setSelectedRace(race);
    selectRace(race);
  };

  return (
    <>
      {races && races.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {races.map((race, index) => (
              <tr key={index} onClick={() => handleRaceClick(race)} role="button">
                <td>{race.name}</td>
                <td>{race.type}</td>
                <td>{race.location}</td>
                <td>{new Date(race.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No races available.</p>
      )}
    </>
  );
};

export default RaceOverviewTable;