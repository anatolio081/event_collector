import React from "react";

type CButtonProps = {
  onClick?: Function;
  color?: string;
  className?: string;
  disabled?: boolean;
  children: any;
};

function CButton(props: CButtonProps) {
  const { onClick = () => {}, color = "bg-blue-500", className = "", disabled=false } = props;
  return (
    <button
      className={`h-8 px-3 rounded-md shadow text-white ${color} whitespace-nowrap ${className} disabled:opacity-50`}
      disabled={disabled}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        onClick(event);
      }}
    >
      {props.children}
    </button>
  );
}

export default CButton;
