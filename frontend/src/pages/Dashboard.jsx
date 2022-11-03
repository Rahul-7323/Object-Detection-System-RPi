import {useState} from "react";

import EventList from "../components/EventList";
import EventView from "../components/EventView";

const Dashboard = ({events}) => {
  const [activeEvent, setActiveEvent] = useState();

  return (
    <>
      <div className="h-screen p-5 flex flex-col gap-5 bg-slate-300">
        <div className="bg-white p-5 shadow-md rounded-2xl">
          <div className="text-4xl font-bold text-center">Dashboard</div>
        </div>
        <div className="h-full grid grid-cols-6 gap-5 overflow-y-auto">
          <div className="h-full flex flex-col col-span-2 bg-white shadow-md rounded-2xl overflow-y-auto gap-y-5">
            <div className="text-3xl text-slate-800 font-bold pl-5 pt-5">
              Events
            </div>
            <EventList events={events} setActiveEvent={setActiveEvent} />
          </div>
          <div className="h-full col-span-4 bg-white shadow-md rounded-2xl overflow-y-auto">
            {activeEvent ? (
              <EventView event={activeEvent} />
            ) : (
              <div className="h-full flex flex-col justify-center text-3xl font-bold text-slate-500">
                <div className="text-center uppercase">
                  Click on any event to see it here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
