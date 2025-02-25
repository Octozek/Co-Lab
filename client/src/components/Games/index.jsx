import { Link } from "react-router-dom";
export default function GameButtons() {
  const games = [
    {
      title: "Pair of Dice",
      image: "./imgs/dice.png",
      description: "Need a pair of dice? Click here to roll them!",
      path: "/games/dice",
    },
    {
      title: "Timer",
      image: "./imgs/stopwatch.png",
      description: "Need a timer? Click here to start one!",
      path: "/games/timer",
    },
    {
      title: "Scoreboard",
      image: "./imgs/scoreboard.png",
      description: "Need a scoreboard? Click here to start one!",
      path: "/games/scoreboard",
    },
  ];

  return (
    <div>
      <style>
        {`
        img {
          width: 150px;
          height: 150px;
        }
        .games {
          display: inline-block;
          margin: 10px;
          padding: 10px;
          border: 3px solid #85c7e4;
          border-radius: 10px;
        }
      `}
      </style>
      {games.map((game, index) => (
        <div key={index} className="games">
          <h3>{game.title}</h3>
          <Link to={game.path}>
            <img src={game.image} alt={game.title}/>
          </Link>
          <p>{game.description}</p>
        </div>
      ))}
    </div>
  );
}
