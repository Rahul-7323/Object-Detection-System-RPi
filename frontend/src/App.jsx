import {useState, useEffect} from "react";
import Dashboard from "./pages/Dashboard";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

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
