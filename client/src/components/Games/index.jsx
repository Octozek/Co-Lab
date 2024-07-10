import { Link } from "react-router-dom";
export default function GameButtons() {

    const games = [
        {
            title: "Pair of Dice",
            image: "https://via.placeholder.com/150",
            description: "This is a description of Game 1.",
            path: "/dice"
        },
        {
            title: "Timer",
            image: "https://via.placeholder.com/150",
            description: "This is a description of Game 2.",
            path: "/timer"
        },
        {
            title: "Scoreboard",
            image: "https://via.placeholder.com/150",
            description: "This is a description of Game 3.",
            path: "/scoreboard"
        }
    ]

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
    )
    }