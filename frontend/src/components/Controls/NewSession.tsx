import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SessionModel } from "../../models/Session";
import CButton from "../Forms/CButton";

function NewSession() {
  const history = useHistory();

  const [sessionName, setSessionName] = useState("manual");

  const createNewSession = async () => {
    const session = await SessionModel.createNew(sessionName);
    history.push(`/sessions/${session.id}`);
    setSessionName("manual");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(event.target.value);
  };

  return (
    <div className="flex">
      <input
        className="pl-2 h-9 bg-transparent border border-gray-700 text-white w-full rounded-md text-sm mr-2"
        value={sessionName}
        onChange={handleChange}
      />
      <div className="flex-grow">
        <CButton onClick={createNewSession}>Новая сессия</CButton>
      </div>
    </div>
  );
}

export default NewSession;
