// src/RollDice.jsx
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
        <h1>Roll Dice</h1>
        <p>{diceNumbers[0]}</p>
        <p>{diceNumbers[1]}</p>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default RollDice;
