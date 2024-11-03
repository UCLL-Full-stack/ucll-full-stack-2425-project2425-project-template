import React from 'react';
import { Race } from '@types';

interface Props {
  races: Race[];
}

const RaceOverviewTable: React.FC<Props> = ({ races }) => {
  return (
    <>
      {races && races.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race, index) => (
              <tr key={index}>
                <td>{race.name}</td>
                <td>{race.type}</td>
                <td>{race.description}</td>
                <td>{race.location}</td>
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
