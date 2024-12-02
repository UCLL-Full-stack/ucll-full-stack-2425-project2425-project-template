import { Participant } from "@types";

interface Props {
  participants: Array<Participant>;
}

const ParticipantList: React.FC<Props> = ({ participants }: Props) => {
  return (
    <>
      {participants && participants.length > 0 ? (
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>
              <p><strong>Driver:</strong> {participant.driver.name} {participant.driver.surname}</p>
              <p><strong>Racecar:</strong> {participant.racecar.name} ({participant.racecar.type})</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No participants available.</p>
      )}
    </>
  );
};

export default ParticipantList;