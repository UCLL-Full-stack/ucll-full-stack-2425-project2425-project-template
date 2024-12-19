import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import router from "next/router";
import NavbarSheet from "@/components/NavbarSheet";
import useSWR from "swr";
import TeamService from "@/services/TeamService";
import { Match, Team } from "@/types";
import MatchService from "@/services/MatchService";
import AddMatch from "@/components/matches/AddMatch";
import DeleteMatch from "@/components/matches/DeleteMatch";
import EditMatch from "@/components/matches/EditMatch";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Table: React.FC = () => {
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [matches, setMatches] = useState<Array<Match>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showAllGames, setShowAllGames] = useState(false); // State to toggle between Our Games and All Games

  const { data: teamList, error, mutate } = useSWR("/teams", TeamService.getAllTeams);
  const { data: matchList, error: matchError, mutate: mutateMatches } = useSWR("/matches", MatchService.getAllMatches);

  useEffect(() => {
    if (teamList) {
      setTeams([...teamList]);
    }
    if (matchList) {
      setMatches([...matchList]);
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [teamList, matchList]);

  const handleAddMatch = async (newMatch: Omit<Match, "id">) => {
    await MatchService.addMatch(newMatch);
    mutateMatches();
    setIsAdding(false);
  };

  const handleEdit = (match: Match) => {
    setSelectedMatch(match);
    setIsEditing(true);
  };

  const handleDeleteMatch = (match: Match) => {
    setSelectedMatch(match);
    setIsDeleting(true);
  };

  const confirmDeleteMatch = async () => {
    if (selectedMatch) {
      await MatchService.deleteMatch(selectedMatch.id!);
      mutateMatches();
      setIsDeleting(false);
    }
  };

  const handleSaveMatch = async (updatedMatch: Match) => {
    await MatchService.updateMatch(updatedMatch.id!, {
      location: updatedMatch.location,
      date: updatedMatch.date,
      homeTeamName: updatedMatch.homeTeamName,
      awayTeamName: updatedMatch.awayTeamName,
      homeScore: updatedMatch.homeScore,
      awayScore: updatedMatch.awayScore,
    });
    mutateMatches();
    setIsEditing(false);
  };

  return (
    <>
      <Head>
        <title>League Table | Manchester Shitty</title>
        <meta name="description" content="League table for Manchester Shitty" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>
      <div className="min-h-screen bg-zinc-900 text-yellow-500 py-8">
        <div className="absolute top-12 right-24">
          <NavbarSheet />
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/images/shittylogo.svg"
              alt="Manchester Shitty Logo"
              width={100}
              height={100}
              draggable={false}
              className="mr-4 cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="text-6xl font-extrabold text-yellow-500 ml-4 font-bebas">
              League Table
            </h1>
          </div>

          <div
            className={`w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700  ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-yellow-500 text-black text-xl">
                  <th className="w-1/12 py-4 text-center">#</th>
                  <th className="w-5/12 py-4 text-center pl-4">Club</th>
                  <th className="w-1/12 py-4 text-center">GS</th>
                  <th className="w-1/12 py-4 text-center">GA</th>
                  <th className="w-1/12 py-4 text-center">GD</th>
                  <th className="w-1/12 py-4 text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <tr
                      key={team.id}
                      className={`even:bg-gray-100 odd:bg-gray-200 text-gray-800 text-lg transition-all duration-200 transform delay-${
                        200 * (index + 1)
                      } ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    >
                      <td className="text-center py-3">{index + 1}</td>
                      <td
                        className={`py-3 pl-4 text-center ${
                          team.name === "Manchester Shitty" ? "font-bold" : ""
                        }`}
                      >
                        {team.name}
                      </td>
                      <td className="text-center py-3 font-bold">{team.goalsFor}</td>
                      <td className="text-center py-3 font-bold">{team.goalsAg}</td>
                      <td className="text-center py-3 font-bold">
                        {team.goalsFor - team.goalsAg}
                      </td>
                      <td className="text-center py-3 font-bold">{team.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-8">
            <h1 className="text-6xl font-extrabold text-yellow-500 ml-4 font-bebas">
              {showAllGames ? "All Games" : "Our Games"}
            </h1>
            
          </div>
          <div className="flex mt-4 gap-2">
          <button
              onClick={() => setShowAllGames((prev) => !prev)}
              className=" px-4 py-2 bg-yellow-500 text-zinc-900 font-bold rounded hover:bg-blue-600 hover:text-white transition "
            >
              {showAllGames ? "Our Games" : "All Games"}
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-4 py-2 bg-yellow-500 text-zinc-900 font-bold rounded hover:bg-green-600 hover:text-white transition "
          >
            <FaPlus />  Match
          </button>
          
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches
              .filter(
                (match) =>
                  showAllGames ||
                  match.homeTeamName === "Manchester Shitty" ||
                  match.awayTeamName === "Manchester Shitty"
              )
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((match) => (
                <div
                  key={match.id}
                  className={`bg-white rounded-lg shadow-md p-4 text-gray-800 transform transition-all duration-700 hover:shadow-xl ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <h2 className={`text-xl font-bold mb-2 text-center ${match.homeTeamName} ===`}>
                    {match.homeTeamName} vs {match.awayTeamName}
                  </h2>
                  <div className="absolute right-4 top-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(match)}
                      className="text-black hover:text-yellow-500 transition"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteMatch(match)}
                      className="text-black hover:text-red-600 transition"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    {new Date(match.date).toLocaleDateString("en-GB", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-center mt-2">
                    <span className="font-bold text-gray-800">Location:</span> {match.location}
                  </p>
                  <p className="text-center mt-2">
                    <span className="font-bold text-gray-800">Score:</span>{" "}
                    {match.homeScore !== null && match.awayScore !== null
                      ? `${match.homeScore} - ${match.awayScore}`
                      : "TBD"}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {isAdding && (
        <AddMatch onSave={handleAddMatch} 
        onClose={() => setIsAdding(false)}
        onCancel={() => setIsAdding(false)} 
        />
      )}

      {isEditing && (
        <EditMatch
          match={selectedMatch}
          onSave={handleSaveMatch}
          onClose={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {isDeleting && (
        <DeleteMatch
          matchName={`${selectedMatch?.homeTeamName} vs ${selectedMatch?.awayTeamName}`}
          onDelete={confirmDeleteMatch}
          onCancel={() => setIsDeleting(false)}
        />
      )}
    </>
  );
};

export default Table;
