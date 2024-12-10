import { Crash, User, Race } from "@types";
import { useState, useEffect } from "react";
import ParticipantList from "./ParticipantList";

interface Props {
  crashes: Crash[];
  onCrashClick: (crash: Crash) => void;
  selectedRace: Race | null;
  handleEditCrash: (crashId: number) => void;
  handleDeleteCrash: (crashId: number) => void;
}

const CrashOverviewTable: React.FC<Props> = ({ crashes, onCrashClick, selectedRace, handleEditCrash, handleDeleteCrash }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [selectedCrash, setSelectedCrash] = useState<Crash | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setSelectedCrash(null); // Reset selected crash when the race changes
  }, [selectedRace]);

  const handleCrashClick = (crash: Crash) => {
    setSelectedCrash(crash);
    onCrashClick(crash);
  };

  return (
    <>
      {crashes && crashes.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Casualties</th>
              <th scope="col">Deaths</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crashes.map((crash, index) => (
              <tr key={index} onClick={() => handleCrashClick(crash)} role="button">
                <td>{crash.type}</td>
                <td>{crash.description}</td>
                <td>{crash.casualties}</td>
                <td>{crash.deaths}</td>
                <td>
                  <button onClick={() => handleEditCrash(crash.id!)} className="btn btn-secondary me-2">Edit</button>
                  <button onClick={() => handleDeleteCrash(crash.id!)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No crashes available.</p>
      )}
      {selectedCrash && (
        <div>
          <h2>Participants in {selectedCrash.type} crash</h2>
          <ParticipantList participants={selectedCrash.participants || []} />
        </div>
      )}
    </>
  );
};

export default CrashOverviewTable;