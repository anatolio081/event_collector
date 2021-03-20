import React from "react";

import { EventModel } from "../../models/Events";

type EventPrevItemProps = {
  item: EventModel;
};

function EventPrevItem(props: EventPrevItemProps) {
  return (
    <React.Fragment>
      <div className="flex xl:flex-row flex-col items-center font-medium text-white pb-2 mb-2 xl:border-b border-opacity-75 border-gray-700 w-full">
        {props.item.event_id}
      </div>

      <div className="flex items-center w-full">
        <div className="text-xs py-1 px-2 leading-none bg-gray-900 text-blue-500 rounded-md">
          {props.item.time.toFormat("HH:mm:ss")}
        </div>
        <div className="ml-auto text-xs text-gray-500">
          {props.item.mac_address}
        </div>
      </div>
    </React.Fragment>
  );
}

function EventPrevItemCompact(props: EventPrevItemProps) {
  return (
    <div className="flex xl:flex-row flex-col items-center font-medium text-white w-full">
      {props.item.event_id}
      <div className="text-xs py-1 px-2 leading-none bg-gray-900 text-blue-500 rounded-md ml-auto ">
        {props.item.time.toFormat("HH:mm:ss")}
      </div>
    </div>
  );
}

export { EventPrevItem, EventPrevItemCompact };
