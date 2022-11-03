import {useEffect, useState} from "react";

// we can make use of time and description in the component
const EventItem = ({event, setActiveEvent}) => {
  const [color, setColor] = useState("bg-gray-300");

  useEffect(() => {
    if (event.level === 1) setColor("bg-blue-400");
    else if (event.level === 2) setColor("bg-yellow-300");
    else if (event.level === 3) setColor("bg-red-500");
  }, []);

  return (
    <>
      <div
        className={`${color} rounded-2xl shadow-md cursor-pointer hover:scale-105 duration-100 ease-in-out`}
        onClick={() => {
          setActiveEvent(event);
        }}
      >
        <div className="flex flex-row p-4 gap-5 align-middle">
          <div className="p-5 flex flex-col bg-slate-800 rounded-2xl w-full">
            <div className="text-white text-xl font-bold">
              {event.timestamp}
            </div>
            <div className="text-slate-200">{event.description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventItem;
