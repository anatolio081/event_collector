import React, { Component } from "react";
import ReactJson from "react-json-view";
import EventsPrev from "./EventsPrev";

import { EventModel } from "../../models/Events";

type EventsState = {
  events: Array<EventModel>;
  selectEvent: EventModel | null;
};

import { RouteComponentProps } from "react-router";

interface MatchParams {
  id: string | undefined;
}

interface EventsStateProps extends RouteComponentProps<MatchParams> {}

class Events extends Component<EventsStateProps, EventsState> {
  sessionId: number;

  jsonPrev = () => {
    if (this.state.selectEvent) {
      const temp = this.state.selectEvent;
      return JSON.parse(temp.json);
    }
    return {};
  };

  constructor(props: any) {
    super(props);
    this.sessionId = 0;
    if (this.props.match.params.id) {
      this.sessionId = parseInt(this.props.match.params.id);
    }
    this.state = { events: [], selectEvent: null };
  }

  async componentDidMount() {
    const data = await EventModel.getList({
      session: this.sessionId,
    });
    this.setState({ events: data });
  }

  selectEvent = (event: EventModel) => {
    this.setState({
      selectEvent: event,
    });
  };

  render() {
    return (
      <div className="flex-grow flex overflow-x-hidden">
        <EventsPrev
          events={this.state.events}
          selectEvent={this.selectEvent}
        ></EventsPrev>

        <div className="flex-grow bg-gray-900 overflow-y-auto event-json-wraper">
          <div className="sm:p-7 p-4 ">
            <ReactJson
              src={this.jsonPrev()}
              theme="tomorrow"
              displayDataTypes={false}
              name={false}
            />
          </div>
        </div>
      </div>
    );
  }
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
