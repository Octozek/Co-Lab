import { useState } from 'react';

const RollDice = () => {
  const [diceNumbers, setDiceNumbers] = useState([1, 1]);
  const rollDice = () => {
    const newNumbers = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    setDiceNumbers(newNumbers);   
  };

  return (
    <div className="roll-dice">
        <h1>Pair of Dice</h1>
        <img src={`../../../public/imgs/die${diceNumbers[0]}.png`} alt={`Die 1 rolled a ${diceNumbers[0]}`} />
        <img src={`../../../public/imgs/die${diceNumbers[1]}.png`} alt={`Die 2 rolled a ${diceNumbers[1]}`} />
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default RollDice;
