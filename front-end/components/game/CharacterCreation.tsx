import { PlayerInput, User } from "@types";
import playerService from '@services/playerService';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CharacterCreationForm: React.FC = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [statusMessages, setStatusMessages] = useState({ message: '', type: '' });

  const [player, setPlayer] = useState<PlayerInput>({
    name: "",
    currency: 0,
    statistics: "hp: 10, power: 10",
    class: "",
    image: "",
    userEmail: "",
  });

  const classOptions = ["Warrior", "Mage", "Rogue"];

  const imageOptions = [
    "ch1",
    "ch2",
    "ch3",
  ];

  const clearErrors = () => {
    setStatusMessages({ message: '', type: '' });
  };

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlayer({
      ...player,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Character created:", player);
    if (loggedInUser && player){
      const input: PlayerInput = {name: player.name, currency: player.currency, statistics: player.statistics, class:player.class, image: player.image, userEmail: loggedInUser.email}
      const response = await playerService.createPlayer(input);

      if (response.status === 200) {
        setStatusMessages({ message: 'Creation Successful', type: 'success' });
        setStatusMessages({
          message: 'Character created succesfully, redirecting...',
          type: 'success',
        });

        setTimeout(() => {
          router.push('/game/characters');
        }, 2000);
      } else {
        setStatusMessages({ message: 'Oops, something went wrong', type: 'error' });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center">
      {statusMessages.message && (
        <div
          className={`${
            statusMessages.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white p-2 text-center mb-4 rounded w-3/4`}
        >
          {statusMessages.message}
        </div>
      )}

      <h1 className="m-4">Create Your Character</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="m-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={player.name}
            onChange={handleChange}
            required
            className="border-2 border-black"
          />
        </div>

        <div className="m-4">
          <label htmlFor="class">Class:</label>
          <select
            id="class"
            name="class"
            value={player.class}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a class
            </option>
            {classOptions.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Image:</label>
          <div className="flex flex-row justify-center">
            {imageOptions.map((image) => (
              <label key={image} style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="image"
                  value={image}
                  checked={player.image === image}
                  onChange={handleChange}
                />
                <img
                  src={"/images/" + image + ".png"}
                  alt="Character option"
                  style={{ width: "50px", height: "50px" }}
                />
              </label>
            ))}
          </div>
        </div>

        <button type="submit"
        className="
          border-solid hover:border-dotted border-2 border-green-500 hover:border-green-600
          rounded p-4 content-center m-4 bg-green-200 hover:bg-green-300"
        >
          Create Character
        </button>
      </form>
    </div>
  );
};

export default CharacterCreationForm;