const EventView = ({event}) => {
  return (
    <>
      <div className="flex flex-col justify-end gap-5 p-8 overflow-y-auto">
        <div className="text-2xl font-bold">{event.timestamp}</div>
        <div className="flex flex-row justify-center">
          <img
            src={import.meta.env.VITE_BACKEND_API_URL + event.image}
            width="600px"
            className="rounded-2xl"
          />
        </div>
        <div className="text-xl font-semibold">{event.description}</div>
        <div className="flex flex-col gap-2">
          {event.objects.map((object) => (
            <div key={object._id} className="flex flex-col gap-1">
              <div className="text-2xl font-bold">{object.name}</div>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{width: object.prob + "%"}}
                >
                  {object.prob}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventView;
