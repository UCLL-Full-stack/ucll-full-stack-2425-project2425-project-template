import TeamEditor from "@/components/teams/TeamEditor";
import TeamService from "@/services/TeamService";
import { Team } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const editTeamPage: React.FC = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTeam = async () => {
        const response = await TeamService.getTeamById(Number(id));
        const teamData = await response.json();
        setTeam(teamData);
      };
      fetchTeam();
    }
  }, [id]);

  const handleTeamUpdated = () => {
    router.push("/teams");
  };

  return (
    <div>
      <h1>Edit Team</h1>
      {team && <TeamEditor team={team} TeamUpdated={handleTeamUpdated} />}
    </div>
  );
};

export default editTeamPage;
