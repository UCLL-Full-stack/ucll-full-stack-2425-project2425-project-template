import { Participant } from "@types";
import Link from "next/link";

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
              <p>
                <strong>Driver:</strong>{" "}
                <Link href={`/drivers/${participant.driver.id}`}>
                  {participant.driver.name} {participant.driver.surname}
                </Link>
              </p>
              <p>
                <strong>Racecar:</strong>{" "}
                <Link href={`/racecars/${participant.racecar.id}`}>
                  {participant.racecar.name} ({participant.racecar.type})
                </Link>
              </p>
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