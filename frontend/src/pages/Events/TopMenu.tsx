import React, { Component } from "react";
import { Link } from "react-router-dom";

type TopMenuState = {
  menus: Array<{
    title: string;
    state: boolean;
    to: string;
  }>;
};

class TopMenu extends Component<{}, TopMenuState> {
  initState() {
    this.setState({
      menus: [
        {
          title: "Sessions",
          state: true,
          to: "/",
        },
      ],
    });
  }

  componentWillMount() {
    this.initState();
  }

  render() {
    return (
      <div className="h-16 lg:flex w-full border-b border-gray-800 hidden px-10">
        <div className="flex h-full text-gray-400">
          {this.state.menus.map((value, index) => {
            let deactiveClass =
              "cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8";
            let activeClass =
              "cursor-pointer h-full border-b-2 text-white border-white inline-flex mr-8 items-center";
            return (
              <Link
                to={value.to}
                key={`item-${index}`}
                className={value.state ? activeClass : deactiveClass}
              >
                {value.title}
              </Link>
            );
          })}
        </div>
        <div className="ml-auto flex items-center space-x-7">
          <button className="h-8 px-3 rounded-md shadow text-white bg-blue-500">
            Button
          </button>
        </div>
      </div>
    );
  }
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