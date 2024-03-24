import React, { FunctionComponent, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

//
import Modal from "../../reusable/modal";

//
import { CrossIcon } from "../../icons";

//
import MultipleCheckbox from "../../reusable/multiple-checkbox";

//
import { ICheckBoxValue } from "../../../@types/utils/IExtras";
//
import { useAppSelector } from "../../../hooks/redux";

//
//
interface Props {
  open: boolean;
  handleClose: () => void;
  stateInput: (value: ICheckBoxValue[]) => void;
}

/**
 *
 */
const USStateModal: FunctionComponent<Props> = ({ open, handleClose, stateInput }) => {
  const [checkboxValue, setCheckboxValue] = useState<ICheckBoxValue[]>([]);
  const state_input = useAppSelector((state) => state.states.states || []);

  //
  const onChange = (value: ICheckBoxValue[]) => {
    setCheckboxValue(value);
  };

  //
  useEffect(() => {
    stateInput(checkboxValue);
  }, [checkboxValue, stateInput]);

  return (
    <Modal open={open} handleOnClose={handleClose}>
      <Dialog.Panel className="w-full lg:max-w-[1000px] transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all">
        <div className="text-gray-500 text-lg mb-4 flex justify-between ">
          <h3 className="font-lg text-secondary-800 font-bold">
            Select states you want to include in the analytics.
          </h3>
          <CrossIcon width={"20px"} className="cursor-pointer" onClick={handleClose} />
        </div>
        <div className=" ">
          <MultipleCheckbox
            topics={states.map((state) => ({
              value: state.code,
              label: state.name,
            }))}
            onChange={onChange}
            value={state_input || []}
            classname={"grid grid-cols-5 gap-y-1 gap-x-2"}
          />
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default USStateModal;

const states = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  { name: "Arizona", code: "AZ" },
  { name: "Arkansas", code: "AR" },
  { name: "California", code: "CA" },
  { name: "Colorado", code: "CO" },
  { name: "Connecticut", code: "CT" },
  { name: "Delaware", code: "DE" },
  { name: "Florida", code: "FL" },
  { name: "Georgia", code: "GA" },
  { name: "Hawaii", code: "HI" },
  { name: "Idaho", code: "ID" },
  { name: "Illinois", code: "IL" },
  { name: "Indiana", code: "IN" },
  { name: "Iowa", code: "IA" },
  { name: "Kansas", code: "KS" },
  { name: "Kentucky", code: "KY" },
  { name: "Louisiana", code: "LA" },
  { name: "Maine", code: "ME" },
  { name: "Maryland", code: "MD" },
  { name: "Massachusetts", code: "MA" },
  { name: "Michigan", code: "MI" },
  { name: "Minnesota", code: "MN" },
  { name: "Mississippi", code: "MS" },
  { name: "Missouri", code: "MO" },
  { name: "Montana", code: "MT" },
  { name: "Nebraska", code: "NE" },
  { name: "Nevada", code: "NV" },
  { name: "New Hampshire", code: "NH" },
  { name: "New Jersey", code: "NJ" },
  { name: "New Mexico", code: "NM" },
  { name: "New York", code: "NY" },
  { name: "North Carolina", code: "NC" },
  { name: "North Dakota", code: "ND" },
  { name: "Ohio", code: "OH" },
  { name: "Oklahoma", code: "OK" },
  { name: "Oregon", code: "OR" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Rhode Island", code: "RI" },
  { name: "South Carolina", code: "SC" },
  { name: "South Dakota", code: "SD" },
  { name: "Tennessee", code: "TN" },
  { name: "Texas", code: "TX" },
  { name: "Utah", code: "UT" },
  { name: "Vermont", code: "VT" },
  { name: "Virginia", code: "VA" },
  { name: "Washington", code: "WA" },
  { name: "West Virginia", code: "WV" },
  { name: "Wisconsin", code: "WI" },
  { name: "Wyoming", code: "WY" },
];
