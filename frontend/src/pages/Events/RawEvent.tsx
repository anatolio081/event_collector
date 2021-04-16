import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import EventsPrev from "./EventsPrev";

import { EventModel } from "../../models/Events";
import { useHistory, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useEvents } from "./Event";

interface MatchParams {
  id: string | undefined;
}

function RawEvents() {
  const { setSelectEvent, jsonPrev, selectEventCallback } = useEvents();
  const { id } = useParams<MatchParams>();
  useEffect(() => {
    setSelectEvent(null);
  }, [id]);
  const tab = useAppSelector((state) =>
    state.tab.value.find((item) => item.id === id)
  );
  const history = useHistory();
  if (!tab) {
    history.push("/");
    return null;
  }
  const sessionId = 0;
  const events: Array<EventModel> = EventModel.fromIter(tab?.data);

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

export default RawEvents;
