import React, { useState } from "react";
import CSelect from "../../components/Forms/CSelect";
import { EventModel } from "../../models/Events";
import { useAppSelector } from "../../store/hooks";

type EventsPrevProps = {
  events: Array<EventModel>;
  selectEvent: Function;
  currentSession: number;
};

type ListItem = Array<{ value: string | number; name: string }>;

function EventsPrev(props: EventsPrevProps) {
  const session = useAppSelector((state) => state.session.value);

  const [selectId, setSelectId] = useState(0);
  const [filter, setFilter] = useState({
    event_id: null,
    mac_address: null,
  });

  const selectEvent = (event: EventModel) => {
    props.selectEvent(event);
    setSelectId(event.id);
  };

  const macList = () => {
    const cummulitive: ListItem = [
      {
        value: "null",
        name: "All",
      },
    ];
    const unique = new Set();
    return props.events.reduce((prev, cur) => {
      if (!unique.has(cur.mac_address)) {
        unique.add(cur.mac_address);
        prev.push({
          value: cur.mac_address,
          name: cur.mac_address,
        });
      }
      return prev;
    }, cummulitive);
  };

  const eventsID = () => {
    const cummulitive: ListItem = [
      {
        value: "null",
        name: "All",
      },
    ];
    const unique = new Set();
    return props.events.reduce((prev, cur) => {
      if (!unique.has(cur.event_id)) {
        unique.add(cur.event_id);
        prev.push({
          value: cur.event_id,
          name: cur.event_id,
        });
      }
      return prev;
    }, cummulitive);
  };

  const filterEvents = () => {
    return props.events.filter((item) => {
      return (
        (filter.event_id === null || filter.event_id == item.event_id) &&
        (filter.mac_address === null || filter.mac_address == item.mac_address)
      );
    });
  };

  //eventIdList = () => {};

  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
      <div className="flex items-center w-full">
        <div className="text-xs text-gray-400 tracking-wider pr-2">EVENTS:</div>
        {props.events.length}
        <div className="ml-auto">
          {session !== null && session.id == props.currentSession ? (
            <div className="text-xs py-1 px-2 leading-none bg-gray-800 text-green-500 rounded-md">
              Активная
            </div>
          ) : (
            <div className="text-xs py-1 px-2 leading-none bg-gray-800 text-blue-500 rounded-md">
              Не активная
            </div>
          )}
        </div>
      </div>
      <div className="relative mt-2">
        <CSelect
          items={eventsID()}
          label="Event ID"
          callBack={(value: any) => {
            filter.event_id = value;
            setFilter(filter);
          }}
        />
        <div className="mt-2">
          <CSelect
            items={macList()}
            label="MAC"
            callBack={(value: any) => {
              filter.mac_address = value;
              setFilter(filter);
            }}
          />
        </div>
      </div>

      {filterEvents().map((value, index) => {
        let deactiveClass =
          "p-3 mt-3 w-full flex flex-col rounded-md bg-gray-800 shadow";
        let activeClass =
          "p-3 mt-3 w-full flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none";
        return (
          <button
            onClick={() => {
              selectEvent(value);
            }}
            className={value.id == selectId ? activeClass : deactiveClass}
            key={`event-prev-${value.id}`}
          >
            <div className="flex xl:flex-row flex-col items-center font-medium text-white pb-2 mb-2 xl:border-b border-opacity-75 border-gray-700 w-full">
              {value.event_id}
            </div>
            <div className="flex items-center w-full">
              <div className="text-xs py-1 px-2 leading-none bg-gray-900 text-blue-500 rounded-md">
                {value.time.toFormat("HH:mm:ss")}
              </div>
              <div className="ml-auto text-xs text-gray-500">
                {value.mac_address}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default EventsPrev;
