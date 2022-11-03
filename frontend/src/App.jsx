import {useState, useEffect} from "react";
import Dashboard from "./pages/Dashboard";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

const dummyEvents = [
  {
    timestamp: "02-11-2022 19:15",
    description:
      "2 phones, 2 boxes and 2 people detected 2 phones, 2 boxes and 2 people detected",
    level: 1,
    objects: [
      {name: "phone", prob: 46},
      {name: "person", prob: 76},
    ],
    image: "https://api.lorem.space/image/game?w=400&h=400",
  },
  {
    timestamp: "02-11-2022 19:16",
    description: "2 phones, 2 boxes and 2 people detected",
    level: 3,
    objects: [
      {name: "phone", prob: 46},
      {name: "person", prob: 76},
    ],
    image: "https://api.lorem.space/image/game?w=400&h=400",
  },
  {
    timestamp: "02-11-2022 19:17",
    description: "2 phones, 2 boxes and 2 people detected",
    level: 2,
    objects: [
      {name: "phone", prob: 46},
      {name: "person", prob: 76},
    ],
    image: "https://api.lorem.space/image/game?w=400&h=400",
  },
  {
    timestamp: "02-11-2022 19:18",
    description: "2 phones, 2 boxes and 2 people detected",
    level: 2,
    objects: [
      {name: "phone", prob: 46},
      {name: "person", prob: 76},
    ],
    image: "https://api.lorem.space/image/game?w=400&h=400",
  },
  {
    timestamp: "02-11-2022 19:19",
    description: "2 phones, 2 boxes and 2 people detected",
    level: 1,
    objects: [
      {name: "phone", prob: 46},
      {name: "person", prob: 76},
    ],
    image: "https://api.lorem.space/image/game?w=400&h=400",
  },
];

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + "api/events/"
        );
        const data = await response.json();
        data.events.reverse();
        setEvents(data.events);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // connection to socket.io
  useEffect(() => {
    socket.on("hello", (arg) => {
      console.log(arg);
    });

    const eventListener = (data) => {
      setEvents((oldEvents) => [data, ...oldEvents]);
    };

    socket.on("newEvent", eventListener);

    return () => socket.off("newEvent", eventListener);
  }, [socket]);

  return (
    <>
      <div className="min-h-screen">
        <Dashboard events={events} />
      </div>
    </>
  );
}

export default App;
