import React from 'react';
import { Lecturer } from '@types';

type Props = {
  lecturers: Array<Lecturer>;
  setLecturer: (lecturer: Lecturer) => void;
};

const LecturerOverviewTable: React.FC<Props> = ({ lecturers, setLecturer }: Props) => {
  return (
    <>
      {lecturers && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer, index) => (
              <tr key={index} onClick={() => setLecturer(lecturer)} role="button">
                <td>{lecturer.user.firstName}</td>
                <td>{lecturer.user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default LecturerOverviewTable;
