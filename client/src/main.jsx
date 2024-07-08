import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Home from './Home.jsx'
import Error from './Error.jsx'
import AboutLeader from './pages/AboutLeader.jsx'
import Chat from './pages/Chat.jsx'
import ComingEvents from './pages/ComingEvents.jsx'
import Games from './pages/Games.jsx'
import Lessons from './pages/Lessons.jsx'
import Login from './pages/Login.jsx'
import PastEvents from './pages/PastEvents.jsx'
import Settings from './pages/Settings.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index : true,
        element: <Home />,
      },
      {
        path: '/about-leader',
        element: <AboutLeader />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/coming-events',
        element: <ComingEvents />,
      },
      {
        path: '/games',
        element: <Games />,
      },
      {
        path: '/lessons',
        element: <Lessons />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/past-events',
        element: <PastEvents />,
      },
      {
        path: '/settings',
        element: <Settings />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
