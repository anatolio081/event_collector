import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SessionModel } from "../../models/Session";
import CButton from "../Forms/CButton";
import { toast } from 'react-toastify';

function NewSession() {
  const history = useHistory();

  const [sessionName, setSessionName] = useState("manual");
  const [loading, setLoading] = useState(false);

  const createNewSession = async () => {
    setLoading(true);
    const session = await SessionModel.createNew(sessionName);
    history.push(`/sessions/${session.id}`);
    setSessionName("manual");
    setLoading(false);
    toast.success(`Новая сессия '${session.name}' создана`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(event.target.value);
  };

  return (
    <div className="flex">
      <input
        className="pl-2 h-9 bg-transparent border border-gray-700 text-white w-full rounded-md text-sm mr-2 disabled:opacity-50"
        value={sessionName}
        onChange={handleChange}
        disabled={loading}
      />
      <div className="flex-grow">
        <CButton disabled={loading} onClick={createNewSession}>Новая сессия</CButton>
      </div>
    </div>
  );
}

export default NewSession;
