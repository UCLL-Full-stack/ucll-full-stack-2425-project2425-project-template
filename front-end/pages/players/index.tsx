import { Player } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import NavbarSheet from "@/components/NavbarSheet";
import { FaEdit, FaTrash } from "react-icons/fa";

const players: Player[] = [
  {
    id: 1,
    name: "Dylan Vangoidtsenhoven",
    position: "Forward",
    number: 24,
    birthdate: new Date("2003-07-15"),
    stat: { playerId: 1, appearances: 14, goals: 13, assists: 8 },
    pictureUrl: "https://i.imgur.com/Dsj69P6.png",
  },
  {
    id: 2,
    name: "P. Diddy",
    position: "Midfielder",
    number: 10,
    birthdate: new Date("1995-05-10"),
    stat: { playerId: 2, appearances: 30, goals: 10, assists: 12 },
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 3,
    name: "Lebron James",
    position: "Defender",
    number: 4,
    birthdate: new Date("2000-03-20"),
    stat: { playerId: 3, appearances: 28, goals: 3, assists: 5 },
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
];

const Players: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [playerList, setPlayerList] = useState(players);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEdit = (id: number) => {
    console.log("Edit player with ID:", id);
    alert(`Edit functionality not yet implemented for Player ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this player?")) {
      setPlayerList((prev) => prev.filter((player) => player.id !== id));
    }
  };

  return (
    <>
      <Head>
        <title>Squad | Manchester Shitty</title>
        <meta name="description" content="Meet the players of Manchester Shitty" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>
      <div className="min-h-screen bg-zinc-900 py-8">
        <div className="absolute top-12 right-8">
          <NavbarSheet />
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/images/shittylogo.svg"
              alt="Manchester Shitty Logo"
              width={100}
              height={100}
              priority
              draggable={false}
              className="mr-4 cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="text-6xl font-bold text-yellow-500 font-bebas">The Squad</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {playerList.map((player, index) => (
              <div
                key={player.id}
                className={`relative bg-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-700 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
               <img
                    src={player.pictureUrl || "/default-player-image.png"}
                    alt={player.name}
                    className=" w-4/6 ml-20"
                />
                
                <div className="absolute right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(player.id!)}
                    className="text-black hover:text-yellow-500 transition"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(player.id!)}
                    className="text-black hover:text-red-600 transition"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{player.name}</h2>
                  <p className="text-gray-600">
                    <strong>Position:</strong> {player.position}
                  </p>
                  <p className="text-gray-600">
                    <strong>Number:</strong> {player.number}
                  </p>
                  <p className="text-gray-600">
                    <strong>Birthdate:</strong>{" "}
                    {new Intl.DateTimeFormat("en-GB").format(player.birthdate)}
                  </p>
                  {player.stat && (
                    <div className="mt-4">
                      <p className="text-gray-600">
                        <strong>Appearances:</strong> {player.stat.appearances}
                      </p>
                      <p className="text-gray-600">
                        <strong>Goals:</strong> {player.stat.goals}
                      </p>
                      <p className="text-gray-600">
                        <strong>Assists:</strong> {player.stat.assists}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Players;
