import { inBattleCharacter, Player } from "@types";
import React, { useEffect, useState } from "react";

interface Props {
    player: Player;
}

const BattleScreen: React.FC<Props> = ({player}) => {
  const [playerChar, setPlayer] = useState<inBattleCharacter>();

  const [enemy, setEnemy] = useState<inBattleCharacter>({
    name: "Enemy",
    hp: getRandomInt(7,50),
    power: getRandomInt(2,5),
    image: "enemy",
  });

  const [message, setMessage] = useState<string>("");
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);

  useEffect(()=>{
    setPlayer({name: player.name, hp: 20, power: 5, image: player.image})
  },[])

  const handleAttack = () => {
    if (playerChar){
        if (!playerTurn || playerChar.hp <= 0 || enemy.hp <= 0) return;

        const newEnemyHp = Math.max(enemy.hp - playerChar.power, 0);
        setEnemy({ ...enemy, hp: newEnemyHp });
        setMessage(`${playerChar.name} attacked for ${playerChar.power} damage!`);
    
        if (newEnemyHp === 0) {
          sessionStorage.setItem("battleResult", "Victory");
          setMessage("You win!");
          return;
        }
    
        setPlayerTurn(false);
        setTimeout(enemyTurn, 1000);
    }
  };

  const handleHeal = () => {
    if (playerChar){
        if (!playerTurn || playerChar.hp <= 0 || enemy.hp <= 0) return;

        const healedHp = Math.min(playerChar.hp + 5, 20);
        setPlayer({ ...playerChar, hp: healedHp });
        setMessage(`${player.name} healed for 5 HP!`);

        setPlayerTurn(false);
        setTimeout(enemyTurn, 1000);
    }
  };

  const enemyTurn = () => {
    if (playerChar){
        if (enemy.hp <= 0 || playerChar.hp <= 0) return;

        const newPlayerHp = Math.max(playerChar.hp - enemy.power, 0);
        setPlayer({ ...playerChar, hp: newPlayerHp });
        setMessage(`${enemy.name} attacked for ${enemy.power} damage!`);

        if (newPlayerHp === 0) {
            sessionStorage.setItem("battleResult", "Loss");
            setMessage("You lose!");
            return;
        }

        setPlayerTurn(true);
    }
  };

  if (!playerChar) return (<></>);

  return (
    <div className="w-80 p-10 bg-gray-800 text-white">
      <p className="text-4xl">Battle</p>

      <div className="justify-around flex mb-5">
        <div>
          <p className="text-2xl">{playerChar.name}</p>
          <img src={"/images/" + playerChar.image + ".png"} alt="Player" className="w-24"/>
          <p>HP: {playerChar.hp}</p>
          <p>Power: {playerChar.power}</p>
        </div>

        <div>
          <p className="text-2xl">{enemy.name}</p>
          <img src={"/images/" + enemy.image + ".png"} alt="Enemy" className="w-24"/>
          <p>HP: {enemy.hp}</p>
          <p>Power: {enemy.power}</p>
        </div>
      </div>

      <div>
        <p>{message}</p>
      </div>

      {playerTurn && playerChar.hp > 0 && enemy.hp > 0 && (
        <div>
          <button onClick={handleAttack} className="mr-2">
            Attack
          </button>
          <button onClick={handleHeal}>Heal</button>
        </div>
      )}
    </div>
  );
};

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default BattleScreen;