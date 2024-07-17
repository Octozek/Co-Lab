import { useState } from "react";

// Scoreboard component using React hooks
export default function Scoreboard() {
  // State variables using useState hook
  const [players, setPlayers] = useState([]); // Array to store player names
  const [playerName, setPlayerName] = useState(""); // Input field value for player name
  const [bracket, setBracket] = useState([]); // Array to store generated bracket matches

  // Function to add a player to the players array
  const addPlayer = () => {
    if (!playerName) return; // Check if playerName is empty
    setPlayers([...players, playerName]); // Add playerName to players array
    setPlayerName(""); // Clear playerName input field
  };

  // Function to remove a player from the players array based on index
  const removePlayer = (index) => {
    const newPlayers = players.filter((player, i) => i !== index); // Create new array without the player at index
    setPlayers(newPlayers); // Update players array with newPlayers
  };

  // Function to generate a tournament bracket
  const makeBracket = () => {
    // Check if there are at least 4 players to create a bracket
    if (players.length % 2 !== 0 || players.length < 4) {
      alert(
        'Need at least 4 and an even number of players (or input "Rest Break") to make a bracket'
      ); // Alert user if there are not enough players
      return;
    }

    // Shuffle players array to create a random order
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);

    // Initialize newBracket array to store match pairs
    const newBracket = [];
    // Iterate through shuffledPlayers array to create match pairs
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      newBracket.push([shuffledPlayers[i], shuffledPlayers[i + 1]]); // Push pair of players into newBracket
    }
    setBracket(newBracket); // Update bracket state with newBracket
  };

  return (
    <div>
      <style>{`
        button {
          margin-left: 10px;
        }
        .list {
          display: flex;
          list-style-type: none;
          padding: 0;
          flex-wrap: wrap;
          width: 100%
        }
        li {
          margin-bottom: 5px;
        }
        
        h2 {
          margin-top: 20px;
        }

        input {
          margin-right: 10px;
        }

        p {
          margin-top: 10px;
        }

        button {
          padding: 10px 20px;
          margin: 10px;
          border: white 1px solid;
        }
        .remove-button {
          background-color: red;
          color: white;
          padding: 10px;
          margin-left: 10px;
          border: white 1px solid;
        }
        .add-button {
          background-color: transparent;
          color: #d2f189;
          padding: 10px;
          font-size: 12px;
          border: white 1px solid;
        }
        .bracket-match {
          font-size: 20px;
          font-weight: bold;
          border: 1px solid gray;
          border-radius: 5px;
          padding: 10px;
          display: inline-block;
        }
        .each-bracket {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
      `}</style>
      <h2>Scoreboard</h2>

      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter Player Name"
      />

      <button className='add-button' onClick={addPlayer}>+</button>
      {/* Display number of players */}
      <p>
        {players.length} player{players.length !== 1 && "s"}
      </p>
      <p>
        Click on a player to remove them from the list.
      </p>
      {/* List of players with remove button for each player */}
      <ul className="list">
        {players.map((player, index) => (
          <li key={index}>
            <button className='remove-button'onClick={() => removePlayer(index)}>{player}</button>
          </li>
        ))}
      </ul>

      <button onClick={() => setPlayers([])}>Clear All</button>

      <button onClick={() => makeBracket()}>Make Bracket</button>

      <h2>Bracket</h2>
      {/* Conditional rendering of bracket matches */}
      {bracket.length > 0 ? (
        <div className="each-bracket">
          {bracket.map((match, index) => (
            <div key={index}>
              <h3>Match {index + 1}</h3>
              <p className="bracket-match">
                {match[0]} vs {match[1]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bracket generated yet.</p>
      )}
      <button onClick={() => setBracket([])}>Reset Bracket</button>
    </div>
  );
}
