import React, { Component, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link, useHistory } from "react-router-dom";
import CButton from "../../components/Forms/CButton";
import { SessionModel } from "../../models/Session";
// @ts-expect-error
import { useSnackbar } from "react-simple-snackbar";

function Sessions() {
  const [openSnack] = useSnackbar({
    position: "top-center",
  });

  const [sessions, setSessions] = useState<SessionModel[]>([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const data = await SessionModel.getList({});
    setSessions(data);
  };

  const history = useHistory();

  const navigateToSession = (session: SessionModel) => {
    history.push(`/sessions/${session.id}`);
  };

  const deleteSession = async (id: number, index: number) => {
    await SessionModel.delete(id);
    const [del] = sessions.splice(index, 1);
    setSessions(sessions);
    openSnack(`Сессия '${del.name}' удалена`, 3000);
  };

  return (
    <div className="flex-grow flex overflow-x-hidden">
      <div className="flex-grow bg-gray-900 overflow-y-auto ">
        <div className="sm:p-7 p-4 ">
          <div className="grid grid-cols-3 gap-4">
            {sessions.map((session, index) => {
              return (
                <a
                  onClick={() => {
                    navigateToSession(session);
                  }}
                  className="p-3 mt-3 w-full flex flex-col rounded-md bg-gray-800 shadow cursor-pointer"
                  key={`session-item-${index}`}
                >
                  <div className="flex xl:flex-row flex-col items-center font-medium text-white pb-2 mb-2 xl:border-b border-opacity-75 border-gray-700 w-full">
                    {`${session.name} / Events: ${session.events}`}
                  </div>
                  <div className="flex items-center w-full">
                    <div className="text-xs py-1 px-2 leading-none bg-gray-900  text-blue-500 rounded-md">
                      {session.created_at
                        .setLocale("ru")
                        .toFormat("dd LLL yyyy HH:mm:ss")}
                    </div>
                    <div className="ml-auto">
                      <CButton
                        color="bg-red-500"
                        onClick={(event: React.MouseEvent<HTMLElement>) => {
                          deleteSession(session.id, index);
                          event.preventDefault();
                        }}
                      >
                        Удалить
                      </CButton>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="sm:p-7 p-4 "></div>
      </div>
    </div>
  );
}

export default Sessions;
