import React, { Component } from "react";

type ListItem = {
  name: string;
  value: string | number;
};

type CSelectProps = {
  items: Array<ListItem>;
  label: string;
  callBack: Function;
};

class CSelect extends Component<CSelectProps> {
  static defaultProps = {
    label: "Label",
    callBack: (value: any) => {},
  };

  render() {
    return (
      <div>
        <label className="text-white font-light">{this.props.label}</label>
        <select
          className="pl-2 h-9 bg-transparent border border-gray-700 text-white w-full rounded-md text-sm"
          onChange={(event) => {
            const val =
              event.target.value == "null" ? null : event.target.value;
            this.props.callBack(val);
          }}
        >
          items
          {this.props.items.map((value, index) => {
            return (
              <option
                className="py-2 bg-gray-700"
                key={`select-item-${index}`}
                value={value.value}
              >
                {value.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default CSelect;
