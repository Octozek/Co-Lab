import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import Home from './pages/Home.jsx'
import Error from './pages/Error.jsx'
import AboutLeader from './pages/AboutLeader.jsx'
import Chat from './pages/Chat.jsx'
import ComingEvents from './pages/ComingEvents.jsx'
import Games from './pages/Games.jsx'
import Lessons from './pages/Lessons.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup';
import PastEvents from './pages/PastEvents.jsx'
import Settings from './pages/Settings.jsx'
import Dice from './pages/GameTools/Dice.jsx'
import Timer from './pages/GameTools/Timer.jsx'
import Scoreboard from './pages/GameTools/Scoreboard.jsx'
import SingleChat from './pages/SingleChat.jsx'
import SingleUser from './pages/SingleUser.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about-leader",
        element: <AboutLeader />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/coming-events",
        element: <ComingEvents />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/games/dice",
        element: <Dice />,
      },
      {
        path: "/games/timer",
        element: <Timer />,
      },
      {
        path: "/games/scoreboard",
        element: <Scoreboard />,
      },
      {
        path: "/lessons",
        element: <Lessons />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/past-events",
        element: <PastEvents />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: '/chats/:chatId',
        element: <SingleChat />,
      },
      {
        path: '/users/:userId',
        element: <SingleUser />,
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
