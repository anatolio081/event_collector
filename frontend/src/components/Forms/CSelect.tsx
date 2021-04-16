import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

type ListItem = {
  name: string;
  value: string | number;
};

type CSelectProps = {
  items: Array<ListItem>;
  label: string;
  callBack: Function;
};

const CSelect = (props: CSelectProps) => {
  const { label = "Label", callBack = (value: any) => {}, items } = props;
  const [selected, setSelected] = useState(items[0]);

  useEffect(() => {
    const find = items.find((item) => item.value === selected.value);
    find ? setSelected(find) : null;
  }, [items]);

  const setValue = (val: ListItem) => {
    setSelected(val);
    callBack(val.value === "null" ? null : val.value);
  };

  return (
    <Listbox value={selected} onChange={setValue}>
      {({ open }) => (
        <>
          <div className="relative mt-3">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-gray-600 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-200"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="z-20 absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {items.map((item) => (
                  <Listbox.Option
                    key={`select-item-${item.value}`}
                    className={({ active }) =>
                      `${active ? "text-green-600 bg-gray-300" : ""}
                          cursor-pointer select-none relative py-2 pl-10 pr-4 focus:outline-none`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-green-500" : "text-green-500"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default CSelect;
