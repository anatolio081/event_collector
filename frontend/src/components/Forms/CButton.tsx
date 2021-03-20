import React from "react";

type CButtonProps = {
  onClick?: Function;
  children: any;
};

function CButton(props: CButtonProps) {
  const { onClick = () => {} } = props;
  return (
    <button
      className="h-8 px-3 rounded-md shadow text-white bg-blue-500"
      onClick={() => {
        onClick();
      }}
    >
      {props.children}
    </button>
  );
}

export default CButton;
