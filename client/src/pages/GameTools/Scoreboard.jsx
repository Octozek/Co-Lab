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
      <h1>Scoreboard</h1>

      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter Player Name"
      />

      <button onClick={addPlayer}>Add Player</button>
      {/* Display number of players */}
      <p>
        {players.length} player{players.length !== 1 && "s"}
      </p>
      {/* List of players with remove button for each player */}
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player}
            <button onClick={() => removePlayer(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={() => setPlayers([])}>Clear Players</button>

      <button onClick={() => makeBracket()}>Make Bracket</button>

      <h2>Bracket</h2>
      {/* Conditional rendering of bracket matches */}
      {bracket.length > 0 ? (
        <div>
          {bracket.map((match, index) => (
            <div key={index}>
              <p>Match {index + 1}</p>
              <p>
                {match[0]} vs {match[1]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bracket generated yet.</p>
      )}
      <button onClick={() => setBracket([])}>Clear Bracket</button>
    </div>
  );
}
