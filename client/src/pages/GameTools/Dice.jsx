import { useState } from 'react';
import { motion } from 'framer-motion';

const RollDice = () => {
  const [diceNumbers, setDiceNumbers] = useState([1, 1]);
  const [key, setKey] = useState(0); // Add a key state to force re-render

  const rollDice = () => {
    const newNumbers = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    setDiceNumbers(newNumbers);
    setKey(prevKey => prevKey + 1); // Increment key to force re-render
  };

  return (
    <div className="roll-dice" style={{ textAlign: 'center' }}>
      <h1>Pair of Dice</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <motion.img
          key={key + 'dice1'} // Unique key for each dice
          src={`../../../public/imgs/die${diceNumbers[0]}.png`}
          alt={`Die 1 rolled a ${diceNumbers[0]}`}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1 }}
          style={{ width: '100px', height: '100px' }}
        />
        <motion.img
          key={key + 'dice2'} // Unique key for each dice
          src={`../../../public/imgs/die${diceNumbers[1]}.png`}
          alt={`Die 2 rolled a ${diceNumbers[1]}`}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 1 }}
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <button onClick={rollDice} style={{ marginTop: '20px', padding: '10px 20px' }}>Roll Dice</button>
    </div>
  );
};

export default RollDice;

