import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { SessionModel } from "../../models/Session";

type EventsState = {
  sessions: Array<SessionModel>;
};

interface MatchParams {}

interface EventsStateProps extends RouteComponentProps<MatchParams> {}

class Sessions extends Component<EventsStateProps, EventsState> {
  // highlight-next-line

  constructor(props: any) {
    super(props);
    this.state = { sessions: [] };
  }

  async componentDidMount() {
    const data = await SessionModel.getList({});
    this.setState({ sessions: data });
  }

  render() {
    return (
      <div className="flex-grow flex overflow-x-hidden">
        <div className="flex-grow bg-gray-900 overflow-y-auto ">
          <div className="sm:p-7 p-4 ">
            <div className="grid grid-cols-3 gap-4">
              {this.state.sessions.map((session, index) => {
                return (
                  <Link
                    to={`/sessions/${session.id}`}
                    className="p-3 mt-3 w-full flex flex-col rounded-md bg-gray-800 shadow"
                    key={`session-item-${index}`}
                  >
                    <div className="flex xl:flex-row flex-col items-center font-medium text-white pb-2 mb-2 xl:border-b border-opacity-75 border-gray-700 w-full">
                      {`${session.name} / Events: ${session.events}`}
                    </div>
                    <div className="flex items-center w-full">
                      <div className="text-xs py-1 px-2 leading-none bg-gray-900 text-blue-500 rounded-md">
                        {session.created_at
                          .setLocale("ru")
                          .toFormat("dd LLL yyyy HH:mm:ss")}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="sm:p-7 p-4 "></div>
        </div>
      </div>
    );
  }
}
export default Sessions;
