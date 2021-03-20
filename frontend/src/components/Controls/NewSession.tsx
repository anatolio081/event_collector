import React from "react";
import { SessionModel } from "../../models/Session";
import CButton from "../Forms/CButton";

function NewSession() {
  const createNewSession = () => {
    SessionModel.createNew();
  };

  return (
    <div className="flex">
      <input className="pl-2 h-9 bg-transparent border border-gray-700 text-white w-full rounded-md text-sm" />
      <CButton onClick={createNewSession}>Новая сессия</CButton>
    </div>
  );
}

export default NewSession;
