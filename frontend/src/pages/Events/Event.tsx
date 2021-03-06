import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import EventsPrev from "./EventsPrev";

import { EventModel } from "../../models/Events";
import { RouteComponentProps } from "react-router";
import { useParams } from "react-router-dom";
import socket, { SocketData } from "../../socket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { replaceTab } from "../../store/tab";
import { SessionModel } from "../../models/Session";

interface MatchParams {
  id: string | undefined;
}

export const useEvents = () => {
  const [selectEvent, setSelectEvent] = useState<EventModel | null>(null);

  const jsonPrev = () => {
    if (selectEvent) {
      const temp = selectEvent;
      return {
        events: [JSON.parse(temp.json)],
      };
    }
    return ["Событие не выбрано"];
  };

  const selectEventCallback = (event: EventModel) => {
    setSelectEvent(event);
  };

  return { selectEvent, setSelectEvent, jsonPrev, selectEventCallback };
};

function Events() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session.value);
  const [events, setEvents] = useState<EventModel[]>([]);
  const { setSelectEvent, jsonPrev, selectEventCallback } = useEvents();
  const { id } = useParams<MatchParams>();
  const sessionId = id ? parseInt(id) : 0;
  let watchEvents: boolean | string = false;

  const eventsIDs = new Set();

  useEffect(() => {
    initData();
    if (watchEvents) {
      socket.emit("leave", watchEvents);
      watchEvents = false;
    }
    if (session && session.id === sessionId) {
      watchEvents = `new_events_${sessionId}`;
      socket.emit("join", watchEvents);
    }
    return () => {
      socket.emit("leave", watchEvents);
      socket.off("json");
    };
  }, [id]);

  socket.off("json");

  socket.on("json", function (data: SocketData) {
    if ((data.type = "new_events")) {
      for (let item of data.data) {
        if (!eventsIDs.has(item.id)) {
          eventsIDs.add(item.id);

          setEvents([
            ...events,
            new EventModel(
              item.id,
              item.event_id,
              item.json,
              item.mac_address,
              item.time
            ),
          ]);
        }
      }
    }
  });

  const initData = async () => {
    eventsIDs.clear();
    setSelectEvent(null);
    const curSession = await SessionModel.get(sessionId);
    dispatch(
      replaceTab({
        id: curSession.id,
        link: `/sessions/${curSession.id}`,
        name: curSession.name,
      })
    );
    const data = await EventModel.getList({
      session: sessionId,
    });
    for (let event of data) {
      eventsIDs.add(event.id);
    }
    setEvents(data);
  };

  return (
    <div className="flex-grow flex overflow-x-hidden">
      <EventsPrev
        events={events}
        selectEvent={selectEventCallback}
        currentSession={sessionId}
      ></EventsPrev>

      <div className="flex-grow bg-gray-900 overflow-y-auto event-json-wraper">
        <div className="sm:p-7 p-4 text-lg leading-4">
          <ReactJson
            src={jsonPrev()}
            theme="tomorrow"
            displayDataTypes={false}
            name={false}
          />
        </div>
      </div>
    </div>
  );
}
export default Events;
/*
<div className="sm:px-7 px-4 pt-1 flex flex-col w-full border-b bg-gray-900 text-white border-gray-800 sticky top-0">
          <div className="flex items-center space-x-3 sm:mt-7 mt-4">
            <a
              href="#"
              className="px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5"
            >
              Activities
            </a>
            <a
              href="#"
              className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5"
            >
              Transfer
            </a>
            <a
              href="#"
              className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden"
            >
              Budgets
            </a>
            <a
              href="#"
              className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden"
            >
              Notifications
            </a>
            <a
              href="#"
              className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden"
            >
              Cards
            </a>
          </div>
        </div>
 */
