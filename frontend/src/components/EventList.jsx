import EventItem from "./EventItem";

const EventList = ({events, setActiveEvent}) => {
  return (
    <>
      <div className="h-full overflow-y-auto flex flex-col gap-y-5 p-5">
        {events.map((event) => (
          <EventItem
            event={event}
            key={event._id}
            setActiveEvent={setActiveEvent}
          />
        ))}
      </div>
    </>
  );
};

export default EventList;
