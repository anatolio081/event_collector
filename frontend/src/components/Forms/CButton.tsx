import React from "react";

type CButtonProps = {
  onClick?: Function;
  color?: string;
  children: any;
};

function CButton(props: CButtonProps) {
  const { onClick = () => {}, color = "bg-blue-500" } = props;
  return (
    <button
      className={`h-8 px-3 rounded-md shadow text-white ${color} whitespace-nowrap`}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        onClick(event);
      }}
    >
      {props.children}
    </button>
  );
}

export default CButton;
