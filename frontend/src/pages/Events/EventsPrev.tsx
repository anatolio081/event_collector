import React, { useMemo, useState, useEffect } from "react";
import CButton from "../../components/Forms/CButton";
import CCheckBox from "../../components/Forms/CCheckBox";
import CSelect from "../../components/Forms/CSelect";
import { EventModel } from "../../models/Events";
import { useAppSelector } from "../../store/hooks";
import { EventPrevItem, EventPrevItemCompact } from "./EventPrevItem";
import { ascend, descend, prop, sortWith } from "ramda";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type EventsPrevProps = {
  events: Array<EventModel>;
  selectEvent: Function;
  currentSession: number;
};

type MatchParams = {
  id: string | undefined;
};

type ListItem = Array<{ value: string | number | null; name: string }>;

function EventsPrev(props: EventsPrevProps) {
  const session = useAppSelector((state) => state.session.value);
  const { id } = useParams<MatchParams>();
  const [compactView, setCompactView] = useState(true);
  const [selectId, setSelectId] = useState<number | string>(0);
  const [filter, setFilter] = useState({
    event_id: null,
    mac_address: null,
  });

  useEffect(() => {
    setFilter({
      event_id: null,
      mac_address: null,
    });
  }, [id]);

  const [order, setOrder] = useState<{ [id: string]: any }>({
    time: "desc",
  });

  const selectEvent = (event: EventModel) => {
    props.selectEvent(event);
    setSelectId(event.id);
  };

  const setSortNewOnTop = (value: boolean) => {
    order.time = value ? "desc" : "asc";
    setOrder({ ...order });
  };

  const macList = () => {
    const cummulitive: ListItem = [
      {
        value: null,
        name: "Любой MAC",
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
        value: null,
        name: "Любой EventID",
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

  const makeFilter = () => {
    const filters = [];
    for (const key in order) {
      if (order[key] == "asc") {
        filters.push(ascend(prop(key)));
      } else {
        filters.push(descend(prop(key)));
      }
    }
    return sortWith(filters);
  };

  const filterEvents = useMemo(() => {
    const events = props.events.filter((item) => {
      return (
        (filter.event_id === null || filter.event_id == item.event_id) &&
        (filter.mac_address === null || filter.mac_address == item.mac_address)
      );
    });
    /* @ts-expect-error */
    return makeFilter()(events) as Array<EventModel>;
  }, [props.events, filter, order]);

  const copyToClipBoard = () => {
    const copy = filterEvents.reduce((acc, curr) => {
      acc += `{ "events": [ ${curr.json} ] }\n`;
      return acc;
    }, "");
    navigator.clipboard.writeText(copy);
    toast.info("Текст скопирован");
  };

  return (
    <div className="xl:w-96 w-72 flex-shrink-0 border-r border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
      <div className="flex items-center w-full">
        <div className="text-xs text-gray-400 tracking-wider pr-2">EVENTS:</div>
        {props.events.length}
        <div className="ml-auto">
          <CCheckBox
            value={compactView}
            label="Компактно"
            callBack={(value: boolean) => {
              setCompactView(value);
            }}
          />
        </div>
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
      <CSelect
        items={eventsID()}
        value={filter.event_id}
        callBack={(value: any) => {
          setFilter((prevState) => ({
            ...prevState,
            event_id: value,
          }));
        }}
      />
      <CSelect
        items={macList()}
        value={filter.mac_address}
        callBack={(value: any) => {
          setFilter((prevState) => ({
            ...prevState,
            mac_address: value,
          }));
        }}
      />
      <div className="mt-2 flex items-center w-full">
        <CButton onClick={copyToClipBoard}>Как текст</CButton>
        <CCheckBox
          value={order.time === "desc"}
          label="Новые сверху"
          className="ml-auto"
          callBack={(value: boolean) => {
            setSortNewOnTop(value);
          }}
        />
      </div>
      {filterEvents.map((value, index) => {
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
            {compactView ? (
              <EventPrevItemCompact item={value} />
            ) : (
              <EventPrevItem item={value} />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default EventsPrev;
