import { Link } from "react-router-dom";
export default function GameButtons() {
  const games = [
    {
      title: "Pair of Dice",
      image: "./public/imgs/dice.png",
      description: "Need a pair of dice? Click here to roll them!",
      path: "/games/dice",
    },
    {
      title: "Timer",
      image: "./public/imgs/stopwatch.png",
      description: "Need a timer? Click here to start one!",
      path: "/games/timer",
    },
    {
      title: "Scoreboard",
      image: "https://via.placeholder.com/150",
      description: "Need a scoreboard? Click here to start one!",
      path: "/games/scoreboard",
    },
  ];

  return (
    <div>
      {games.map((game, index) => (
        <div key={index}>
          <h3>{game.title}</h3>
          <Link to={game.path}>
            <img src={game.image} alt={game.title} />
          </Link>
          <p>{game.description}</p>
        </div>
      ))}
    </div>
  );
}
