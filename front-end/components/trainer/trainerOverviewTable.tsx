
import React from 'react';
import { Trainer } from '@types';

type Props = {
  trainers: Array<Trainer>;
  selectTrainer: (trainer: Trainer) => void;
};

const TrainerOverviewTable: React.FC<Props> = ({ trainers, selectTrainer }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
        </tr>
      </thead>
      <tbody>
        {trainers.map((trainer, index) => (
          <tr key={index} onClick={() => selectTrainer(trainer)} role="button">
            <td>{trainer.user.firstName}</td>
            <td>{trainer.user.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrainerOverviewTable;
