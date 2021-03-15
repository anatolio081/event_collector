import React, { Component } from "react";
import CSelect from "../../components/Forms/CSelect";
import { EventModel } from "../../models/Events";

type EventsPrevProps = {
  events: Array<EventModel>;
  selectEvent: Function;
};

type ListItem = Array<{ value: string | number; name: string }>;

type EventsPrevState = {
  select_id: number;
  filter: {
    event_id: string | null;
    mac_address: string | null;
  };
};

class EventsPrev extends Component<EventsPrevProps, EventsPrevState> {
  constructor(props: any) {
    super(props);
    this.state = {
      select_id: 0,
      filter: {
        event_id: null,
        mac_address: null,
      },
    };
  }

  static defaultProps = {
    events: [],
    selectEvent: (event: EventModel) => {},
  };

  selectEvent(event: EventModel) {
    this.props.selectEvent(event);
    this.setState({
      select_id: event.id,
    });
  }

  get macList() {
    const cummulitive: ListItem = [
      {
        value: "null",
        name: "All",
      },
    ];
    const unique = new Set();
    return this.props.events.reduce((prev, cur) => {
      if (!unique.has(cur.mac_address)) {
        unique.add(cur.mac_address);
        prev.push({
          value: cur.mac_address,
          name: cur.mac_address,
        });
      }
      return prev;
    }, cummulitive);
  }

  get eventsID() {
    const cummulitive: ListItem = [
      {
        value: "null",
        name: "All",
      },
    ];
    const unique = new Set();
    return this.props.events.reduce((prev, cur) => {
      if (!unique.has(cur.event_id)) {
        unique.add(cur.event_id);
        prev.push({
          value: cur.event_id,
          name: cur.event_id,
        });
      }
      return prev;
    }, cummulitive);
  }

  get filterEvents() {
    const filter = this.state.filter;
    return this.props.events.filter((item) => {
      return (
        (filter.event_id === null || filter.event_id == item.event_id) &&
        (filter.mac_address === null || filter.mac_address == item.mac_address)
      );
    });
  }

  eventIdList = () => {};

  render() {
    return (
      <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
        <div className="flex items-center w-full">
          <div className="text-xs text-gray-400 tracking-wider pr-2">
            EVENTS:
          </div>
          {this.props.events.length}
        </div>
        <div className="relative mt-2">
          <CSelect
            items={this.eventsID}
            label="Event ID"
            callBack={(value: any) => {
              const filter = this.state.filter;
              filter.event_id = value;
              this.setState({
                filter: filter,
              });
            }}
          />
          <div className="mt-2">
            <CSelect
              items={this.macList}
              label="MAC"
              callBack={(value: any) => {
                const filter = this.state.filter;
                filter.mac_address = value;
                this.setState({
                  filter: filter,
                });
              }}
            />
          </div>
        </div>

        {this.filterEvents.map((value, index) => {
          let deactiveClass =
            "p-3 mt-3 w-full flex flex-col rounded-md bg-gray-800 shadow";
          let activeClass =
            "p-3 mt-3 w-full flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none";
          return (
            <button
              onClick={() => {
                this.selectEvent(value);
              }}
              className={
                value.id == this.state.select_id ? activeClass : deactiveClass
              }
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
}

export default EventsPrev;
