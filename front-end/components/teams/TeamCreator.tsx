import React, { useState, useEffect } from "react";
import TeamService from "@/services/TeamService";
import { Team, Coach, Player } from "@/types";
import CoachService from "@/services/CoachService";
import PlayerService from "@/services/PlayerService";
import router from "next/router";

type Props = {
  onTeamCreated: () => void;
};

const TeamCreator: React.FC<Props> = ({ onTeamCreated }) => {
  const [teamName, setTeamName] = useState<string>("");
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<Array<Player>>([]);
  const [coaches, setCoaches] = useState<Array<Coach>>([]);
  const [players, setPlayers] = useState<Array<Player>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [coachesData, playersData] = await Promise.all([
        CoachService.getAllCoaches(),
        PlayerService.getAllPlayers(),
      ]);
      setCoaches(await coachesData.json());
      setPlayers(await playersData.json());
    };
    fetchData();
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName || !selectedCoach) return;

    const newTeam: Team = {
      teamName,
      coach: selectedCoach,
      players: selectedPlayers,
    };

    await TeamService.createTeam(newTeam);
    onTeamCreated();
  };

  const togglePlayerSelection = (player: Player) => {
    setSelectedPlayers((prevSelected) =>
      prevSelected.find((p) => p.id === player.id)
        ? prevSelected.filter((p) => p.id !== player.id)
        : [...prevSelected, player]
    );
  };

  const selectCoach = (coach: Coach) => {
    setSelectedCoach(coach);
  };

  return (
    <div>
      <h2>Create a New Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <h3>Select Coach</h3>
      {coaches.map((coach) => (
        <div key={coach.id}>
          <input
            type="radio"
            name="coach"
            checked={selectedCoach?.id === coach.id}
            onChange={() => selectCoach(coach)}
          />
          {coach.firstName} {coach.lastName}
        </div>
      ))}

      <h3>Select Players</h3>
      {players.map((player) => (
        <div key={player.id}>
          <input
            type="checkbox"
            checked={!!selectedPlayers.find((p) => p.id === player.id)}
            onChange={() => togglePlayerSelection(player)}
          />
          {player.firstName} {player.lastName}
        </div>
      ))}

      <button onClick={handleCreateTeam}>Create Team</button>
    </div>
  );
};

export default TeamCreator;
