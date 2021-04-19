import React, { useState } from "react";
import { useModal } from "react-modal-hook";
import Modal from "../Modal";
import CButton from "../../components/Forms/CButton";
import { ExclamationIcon } from "@heroicons/react/outline";

import { replaceTab } from "../../store/tab";
import { useAppDispatch } from "../../store/hooks";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

export const useParseModal = () => {
  const parseText = (text: string) => {
    const parsed = [];
    const lines = text.split("\n");
    const errors = [];
    for (let line in lines) {
      if (lines[line].length) {
        try {
          const events = JSON.parse(lines[line]);
          for (const ev of events.events) parsed.push(ev);
        } catch (error) {
          errors.push(parseInt(line) + 1);
        }
      }
    }
    return { errors, parsed };
  };
  const history = useHistory();

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => {
    const [textInput, setTextInput] = useState("");
    const [errors, setErrors] = useState<Array<number>>([]);
    const dispatch = useAppDispatch();

    const parseInput = () => {
      const { errors, parsed } = parseText(textInput);
      if (errors.length > 0) {
        setErrors(errors);
      } else {
        hideModal();
        addRawTab(parsed);
        setTextInput("");
      }
    };

    const addRawTab = (data: Array<any>) => {
      const id = uuidv4();
      dispatch(
        replaceTab({
          id,
          link: `/raw-sessions/${id}`,
          name: `Raw EV:${data.length}`,
          data: data,
        })
      );
      history.push(`/raw-sessions/${id}`);
    };

    return (
      <Modal
        open={open}
        onExited={onExited}
        dialogTitle="Парсинг записей"
        buttons={
          <>
            <CButton
              onClick={() => {
                setTextInput("");
                hideModal();
              }}
              color="bg-red-600"
            >
              Отмена
            </CButton>
            <CButton className="mr-2" onClick={parseInput}>
              Распарсить
            </CButton>
          </>
        }
      >
        <div className="mt-2">
          <textarea
            className="p-2 h-40 bg-transparent border border-gray-700 text-white w-full rounded-md text-sm"
            value={textInput}
            onChange={(event) => {
              setTextInput(event.target.value);
            }}
          ></textarea>
          <p className="text-sm text-gray-500">Вставьте список записей</p>
          {errors.length > 0 ? (
            <div
              className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
              role="alert"
            >
              <ExclamationIcon className="h-5 w-5 " />

              <p>найдены ошибки при парсинге в линиях: {errors.join(", ")}</p>
            </div>
          ) : null}
        </div>
      </Modal>
    );
  });

  return [showModal, hideModal];
};
