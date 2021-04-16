import React, { useMemo } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import NewSession from "../../components/Controls/NewSession";
import { useLocation } from "react-router-dom";
import { XIcon, DocumentAddIcon } from "@heroicons/react/outline";
import { useParseModal } from "../../components/Modals/ParseModal";
import { removeTab } from "../../store/tab";

type MatchParams = {
  id: string | undefined;
};

type TopMenuItem = {
  title: string;
  state: boolean;
  to: string;
  id: string | number;
};

function TopMenu() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const session = useAppSelector((state) => state.session.value);
  const [showModal] = useParseModal();
  const tabs = useAppSelector((state) => state.tab.value);
  const history = useHistory();

  const fullMenus = useMemo(() => {
    const menus: Array<TopMenuItem> = [
      {
        title: "Sessions",
        state: location.pathname === "/",
        to: "/",
        id: "0",
      },
    ];

    const items = tabs.map((item) => {
      return {
        title: item.name,
        state: location.pathname === item.link,
        to: item.link,
        id: item.id,
      };
    });
    return menus.concat(items);
  }, [tabs, location]);

  const removeTabCall = (delid: string | number) => {
    const rem = fullMenus.find((item) => item.id == delid);
    dispatch(removeTab(delid));
    if (rem?.state) {
      history.push("/");
    }
  };

  const deactiveClass =
    "cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8";
  const activeClass =
    "cursor-pointer h-full border-b-2 text-white border-white inline-flex mr-8 items-center";

  return (
    <div className="h-16 lg:flex w-full border-b border-gray-800 hidden px-10">
      <div className="flex h-full text-gray-400">
        {fullMenus.map((value, index) => {
          return (
            <Link
              to={value.to}
              key={`item-${index}`}
              className={value.state ? activeClass : deactiveClass}
            >
              {value.title}
              {value.to !== "/" ? (
                <XIcon
                  className="h-5 w-5 text-red-500"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    event.nativeEvent.stopImmediatePropagation();
                    event.nativeEvent.stopPropagation();
                    event.nativeEvent.preventDefault();
                    removeTabCall(value.id);
                    return false;
                  }}
                />
              ) : null}
            </Link>
          );
        })}

        <button
          className={`${deactiveClass} focus:outline-none`}
          onClick={showModal}
        >
          Распарсить
          <DocumentAddIcon className="h-5 w-5 text-green-500" />
        </button>
      </div>

      <div className="ml-auto flex items-center space-x-7">
        {session == null ? (
          <p>Нет сесси</p>
        ) : (
          <p className="p-2 rounded-md bg-gray-800 shadow">
            Текущая сессия:
            <Link to={`/sessions/${session.id}`} className="text-blue-500">
              {`
              ${session.name} /
              ${session.created_at
                .setLocale("ru")
                .toFormat("dd LLL yyyy HH:mm:ss")}
                `}
            </Link>
          </p>
        )}
        <NewSession />
      </div>
    </div>
  );
}

export default TopMenu;
/*
<button className="flex items-center">
            <span className="relative flex-shrink-0">
              <img
                className="w-7 h-7 rounded-full"
                src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                alt="profile"
              />
              <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
            </span>
            <span className="ml-2">James Smith</span>
            <svg
              viewBox="0 0 24 24"
              className="w-4 ml-1 flex-shrink-0"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>*/
